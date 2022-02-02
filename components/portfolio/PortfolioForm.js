import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import moment from 'moment';

import PortDatePicker from '../form/PortDatePicker';
import PortInput from '../form/PortInput';

const validateInputs = (values) => {
  const errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if(!values[key] && (key != 'startDate' || key !== 'endDate')) {
      errors[key] = `Field ${key} is Required!!!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if(startDate && endDate && endDate.isBefore(startDate)){
    errors.endDate = 'End Date cannot be before Start Date!!!';
  }

  return errors;
}

const PortfolioForm = ({ onSubmit, error, initialValues }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>          
          <Field 
            type="text" 
            name="title" 
            label='Title'
            component={PortInput}
          />
          <Field 
            type="text" 
            name="company" 
            label='Company'
            component={PortInput}
          />     
          <Field 
            type="text" 
            name="location" 
            label='Location'
            component={PortInput}
          />
          <Field 
            type="text" 
            name="position"
            label='Position' 
            component={PortInput}
          />
          <Field 
            type="textarea" 
            name="description"
            label='Description'
            component={PortInput}
          />
           
          <Field 
            name="startDate"
            label='Start Date'
            initialDate={initialValues.startDate}
            component={PortDatePicker}
          />

          <Field  
            name="endDate"
            label='End Date'
            canBeDisabled={true}
            initialDate={initialValues.endDate}
            component={PortDatePicker}
          />

          {
            error && <Alert color="danger">{error}</Alert>
          }

          <Button color='success' size='lg' type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioForm;






















// export default class Form extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {title: '', description: '', language: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       debugger;
//       const field = event.target.name;
//       this.setState({[field]: event.target.value});
//     }
  
//     handleSubmit(event) {
//       alert('A title was submitted: ' + this.state.title + ' ' + this.state.description + ' ' + this.state.language);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <Label>
//             Name:
//             <input type="text" name='title' value={this.state.value} onChange={this.handleChange} />
//           </Label>
//           <Label>
//             Description:
//             <textarea name='description' value={this.state.description} onChange={this.handleChange}/>
//           </Label>
//           <Label>
//             Pick your favorite Programming Language:
//             <select name='language' value={this.state.language} onChange={this.handleChange}>
//               <option value="javascript">JavaScript</option>
//               <option value="java">Java</option>
//               <option value="python">Python</option>
//               <option value="c#">C Sharp</option>
//             </select>
//           </Label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }