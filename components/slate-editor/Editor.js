import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import Html from 'slate-html-serializer';
 
import { renderMark, renderNode } from './renderers';
import ControllMenu from './ControllMenu';
import { initialValue } from './initial-value';
import HoverMenu from './HoverMenu';
import { rules } from './rules';


const html = new Html({ rules })

export default class SlateEditor extends React.Component {
    state = {
        value: Value.create(),
        isLoaded: false
    }

    componentDidMount() {
        const value = this.props.initialValue ? Value.fromJSON(html.deserialize(this.props.initialValue)) : Value.fromJSON(initialValue)

        this.updateMenu();
        this.setState({isLoaded: true, value});
    }

    componentDidUpdate() {
        this.updateMenu();
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    updateMenu = () => {
        const menu = this.menu;
        if(!menu) return

        const { value } = this.state;
        const { fragment, selection } = value

        if(selection.isBlurred || selection.isCollapsed || fragment.text === '') {
            menu.removeAttribute('style')
            return
        }

        const native = window.getSelection()
        const range = native.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        menu.style.opacity = 1
        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

        menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`
    }

    getTitle(){
        const { value } = this.state;
        const firstBlock = value.document.getBlocks().get(0);
        const secondBlock = value.document.getBlocks().get(1);

        const title = firstBlock && firstBlock.text ? firstBlock.text : 'No Title';
        const subTitle = secondBlock && secondBlock.text ? secondBlock.text : 'No Sub Title';

        return {
            title,
            subTitle
        }
    }


    save() {
        const { save } = this.props;
        const { value, isLoading } = this.state;
        const headingValues = this.getTitle();
        const text = html.serialize(value);
        !isLoading && save(text, headingValues);
    }
 

    render() {
        const { isLoaded } = this.state;

        return (
            <React.Fragment>
                {   isLoaded &&
                    <Editor 
                        {...this.props}
                        placeholder="Enter some text..."
                        value={this.state.value} 
                        onChange={this.onChange}
                        renderMark={renderMark}
                        renderNode={renderNode}
                        renderEditor={this.renderEditor}
                    />
                }
            </React.Fragment>
        )
    }

    renderEditor = (props, editor, next) => {
        const children = next();
        const { isLoading } = props;
        return (
            <React.Fragment>
                <ControllMenu isLoading={isLoading} save={() => this.save()}></ControllMenu>
                {children}
                <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor}/>
            </React.Fragment>
        )
    }
}
