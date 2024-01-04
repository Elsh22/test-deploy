import React from 'react';
import ContactForm from './ContactForm';

interface ContactProps {
  id: string;
}

const Contact = ({ id }: ContactProps) => {
  return (
    <div className="p-4 max-w-3xl mt-10 mx-auto" id={id}>
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-center mb-4">Please fill in the form below</p>
      
      <ContactForm />
    
    </div>
  );
}

export default Contact;
