import React from 'react';
import { IoIosOptions } from 'react-icons/io';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class BlogButtonDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    renderMenu(items) {
        return (
            <DropdownMenu>
                {
                    items.map((item, index) => (
                            <DropdownItem key={index} {...item.handlers}>{item.text}</DropdownItem>
                        )
                    )
                }
            </DropdownMenu>
        )
    }

    render() {
        const { items } = this.props;
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                   <IoIosOptions size='2em'/>
                </DropdownToggle>
                {this.renderMenu(items)}
            </ButtonDropdown>
        )
    }
}