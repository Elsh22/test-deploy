import Contacts from '../../../components/Form/Contacts'
import Layout2 from '../layout';

const ContactsPage = () => {
  return (
    <div className='px-10 py-6 mt-20 mb-20'>
      <Contacts />
    </div>
  )
}

ContactsPage.getLayout = function getLayout(page: any) {
  return <Layout2>{page}</Layout2>;
}

export default ContactsPage