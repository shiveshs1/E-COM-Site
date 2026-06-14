import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

function Contact() {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} /> 
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 px-4'>
        <img className='w-full md:max-w-[480px] max-w-[300px]' src={assets.contact_img} alt="Contact" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Dharavi <br /> Sector 28, Navi Mumbai, Maharashtra</p>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: admin@forever.com</p>
          <p className='text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and jobs</p>
          <button className='border border-black px-8 py-4 text-sm hoever:bg-black hover:text-white transition-all duration-500'></button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
}

export default Contact;