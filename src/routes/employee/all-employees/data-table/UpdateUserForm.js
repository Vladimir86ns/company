/**
 * Update User Details Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateUserForm = ({ employee, onUpdateUserDetail }) => (
    <Form>
        <FormGroup>
            <Label for="userName">Name</Label>
            <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={employee.first_name}
                onChange={(e) => onUpdateUserDetail('first_name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={employee.last_name}
                onChange={(e) => onUpdateUserDetail('last_name', e.target.value)}
            />
        </FormGroup>
    </Form>
);

export default UpdateUserForm;
