import React from 'react';
import '../styles/LandingPage.css';
import rocket from '../assets/rocket.svg';
import gear from '../assets/gear.svg';
import verify from '../assets/verify.svg';
import batch from '../assets/BatchGeneration.svg';
import free from '../assets/Free.svg';
import digital from '../assets/DigitalCertificates.svg';
import Menu from './Menu';
import headerImage from '../assets/CertificateHeaderImage.svg';

const LandingPage = ({ startApp }) => {

  return (
    <div className='Page'> 
      <div className='landingPage'>

        <Menu startApp={startApp} />

        <div className="landing-page" id="top">
          <div className="landing-page-title">
            <h1>Boost Your Events With <br/><span>Customized Certification!</span></h1>
            <p>Welcome to our certificate generation platform! 
              Our mission is to streamline the certificate creation process. 
              Explore our resources to enhance your events with personalized certification.</p>
            <button onClick={startApp}>Start for free</button>
          </div>
          <div className="landing-page-image">
            <img src={headerImage} alt="Header" className="header-image" />
          </div>
        </div>

        <div className="Features" id="features">
          <div className="features-content">
            <div className="card"> 
              <img src={digital} alt="Header" className="header-image" />
              <h1>Digital Certificates</h1>
              <p>Give your students, employees, or attendees something to show for their efforts. Create digital credentials in minutes with our easy-to-use certificate maker software.</p>
            </div>

            <div className="card"> 
              <img src={batch} alt="Header" className="header-image" />
              <h1>Batch Generation</h1>
              <p>With our platform, you can easily perform batch certificate generation. This means you can create multiple certificates at once, providing efficiency and convenience for large events, courses, or educational programs.</p>
            </div>

            <div className="card"> 
              <img src={free} alt="Header" className="header-image" />
              <h1>It's free!</h1>
              <p>Enjoy our platform at no cost! Experience the convenience of creating certificates without any fees or charges. Start generating certificates effortlessly and enhance your events with personalized certification, completely free of charge.</p>
            </div>
            
          </div>


          <div className="features-text">
            <h1> Design and generate digital certificates in one place </h1>
            <p> Certifier lets you create professionally-looking  certificates without advanced design skills or tools. </p>
          </div>


          <div className="features-content">
            <div className="card" style={{backgroundColor: '#dad4ff'}}> 
              <div className="cardFeatureImg">
                <img src={rocket} alt="Header" className="header-image" />
              </div>
              <h1 style={{color: '#6f67be'}}>More than a certificate maker</h1>
              <p style={{color: '#8f8acb'}}>It's not just a certificate generator. Certify is a complete solution for all aspects of digital certification generation, from design to download with personal appointment.</p>
            </div>

            <div className="card" style={{backgroundColor: '#baebe2'}}> 
              <div className="cardFeatureImg"> 
               <img src={gear} alt="Header" className="header-image" />
              </div>
              <h1 style={{color: '#00bd9c'}} >Included Features</h1>
              <p style={{color: '#7ec7bb'}} >Other free certificate generators are limited in the features they offer. With Certify you can take your certificate creation to the next level.</p>
            </div>
            
            <div className="card" style={{backgroundColor: '#e791ce'}}>
              <div className="cardFeatureImg">  
                <img src={verify} alt="Header" className="header-image" />
              </div>
              <h1 style={{color: '#ffd9f4'}} >100% free and intuitive</h1>
              <p style={{color: '#9f3c83'}} >Certify offers a quick and easy way to create your entire certification process with a free and intuitive platform.</p>
            </div>
          </div>

          <div className="features-button">
            <button onClick={startApp}>Start for free</button>
          </div>
        </div>
        <div className="Questions" id="questions">
          <div className='questionTop'>
            <div className="cardQuestion"> 
                  <h1>Can I generate certificates in bulk (mass-generate)?</h1>
                  <p>Yes, you can generate certificates in bulk with Certify. To automatically generate certificates, click the "generate certificates" button in the menu, fill in all the fields and that's it! Your certificates will be ready.</p>
            </div>
            <div className="cardQuestion"> 
                  <h1>Can I add custom branding to issued certificates? </h1>
                  <p>Yes absolutely! Certify's design builder allows you to customize your certificates to match your organization's branding. You can change the background and add your logo!</p>
            </div>
          </div>

          <div className='questionBottom'>
            <div className="cardQuestion"> 
                  <h1>What is the purpose of automated certificate generation?</h1>
                  <p>Automated certificate generation allows you to generate multiple certificates at once without excessive manual work. It also helps ensure consistency in how all certifications are created, which can help improve security by reducing human error.</p>
            </div>
            <div className="cardQuestion"> 
                  <h1>Why do you need a certificate maker?</h1>
                  <p>Without a certificate generator, creating and issuing certifications will be time-consuming and tedious. A certificate generator can speed up this process. It will allow you to quickly and easily create professional-looking certificates without design skills and generate them in bulk with just a few clicks.</p>
            </div>
          </div>

        </div>
        <div class="ImportantNoticeBox" id="warnings">
          <div class="ImportantNotice">
            <h2>Important Notice: System Under Development</h2>
            <p>
              Dear users, please be informed that the system is still under development and improvement to meet specific needs.
              During this period, we kindly request your cooperation in complying with the following instructions:
            </p>
            <ul>
              <li>Ensure that the submitted signature has a transparent background.</li>
              <li>Submitted logos must be in 1:1 format.</li>
              <li>Send certificates manually by individual email or by another means of your preference.</li>
              <li>Pay close attention to filling in all required fields.</li>
            </ul>
            <p>Thank you for your understanding and cooperation during this improvement period.</p>
          </div>
        </div>

        <div class="credits">
            <div class="row">
                <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                    <div class="copyright-text">
                        <p>Copyright &copy; 2024, All Right Reserved Laís Lara </p>
                    </div>
                </div>
            </div>
        </div>

      </div> 
    </div>
  );
};

export default LandingPage;
