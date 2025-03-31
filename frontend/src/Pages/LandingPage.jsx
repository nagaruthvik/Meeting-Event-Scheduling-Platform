import React from 'react'
import styles from "./LandingPage.module.css"
import { useNavigate } from 'react-router'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div id={styles.pageContainer}>
        <nav id={styles.navBar}>
          <div id={styles.logSection}><img src="./Vector.png" alt="Cube-img" /><h1>CNNCT</h1></div>
          <button onClick={()=>navigate("/signup")} id={styles.landingPageButton}> Sign up free</button>
        </nav>

        <main id={styles.MainContainer}>
          <main id={styles.headingLandingPage}>
          <h1>CNNCT – Easy</h1>
          <h1>Scheduling Ahead</h1>
          <button  onClick={()=>navigate("/signup")} id={styles.landingPageButton}> Sign up free</button>
          <img id={styles.screen1Img} src="./screen 1.png" alt="" />

          <h1>Simplified scheduling for you and your team</h1>

          <p>CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.</p>

          <section id={styles.subSection}>
            <section id={styles.subSectionDesc}>
              <h1>Stay Organized with Your </h1>
              <h1>Calendar & Meetings</h1>
              <p>Seamless Event Scheduling</p>
              <ul>
                <li>View all your upcoming meetings and appointments in one place.</li>
                <br />
                <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts</li>
                <br />
                <li>Customize event types: one-on-ones, team meetings, group sessions, and webinars.</li>
              </ul>
            </section>
            <section id={styles.subSectionImg}>
              <img id={styles.subSectionImg1} src="./Fantastical 1.png" alt="" />
              <img id={styles.subSectionImg2} src="./screen 3.png" alt="" />
              
            </section>

            
          </section>

          <section id={styles.subSection1}>
            <section ><h1 className={styles.subSection1Heading1}>Here's what our <span className={styles.blueHeading}>customer</span></h1>

              <h1 className={styles.subSection1Heading2}>has to says</h1>
              <button id={styles.subSection1Btn}>Read customer stories</button>
              
            </section>
              
            <section>

            </section>
          </section>
          <br />
          <section id={styles.chipSection}>
            <div className={styles.chip} id={styles.chip1}>
              <h4>Amazing tool! Saved me months </h4>

              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful. </p>

              <div className={styles.lowerSection}>
                <div className={styles.blueDot}></div>
                <div className={styles.lowerSectionDetials}>
                <p>John Master </p>
                <p>Director, Spark.com</p>
                </div>
                
              </div>
            </div>
            <div className={styles.chip} id={styles.chip2}>
            <h4>Amazing tool! Saved me months </h4>
            <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful. </p>
                <div className={styles.lowerSection}>
                    <div className={styles.blueDot}></div>
                    <div className={styles.lowerSectionDetials}>
                    <p>John Master </p>
                    <p>Director, Spark.com</p>
                  </div>
                </div>

              
            </div>
            
            <div className={styles.chip} id={styles.chip3}>
            <h4>Amazing tool! Saved me months </h4>
            <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful. </p>
                <div className={styles.lowerSection}>
                    <div className={styles.blueDot}></div>
                    <div className={styles.lowerSectionDetials}>
                    <p>John Master </p>
                    <p>Director, Spark.com</p>
                  </div>
                </div>
            </div>
            <div className={styles.chip} id={styles.chip4}>
            <h4>Amazing tool! Saved me months </h4>
            <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful. </p>
                <div className={styles.lowerSection}>
                    <div className={styles.blueDot}></div>
                    <div className={styles.lowerSectionDetials}>
                    <p>John Master </p>
                    <p>Director, Spark.com</p>
                  </div>
                </div>
            </div>
          </section>

          <section className={styles.integration}>
            <h1>All Link Apps and Integrations</h1>

          </section>
          <section id={styles.section3Container} >
            <div className={styles.Container}>
              <img src="./icon1.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Audiomack</p>
                <p>Add an Audiomack player to your Linktree</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon2.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Bandsintown</p>
                <p>Drive ticket sales by listing your events</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon3.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Bonfire</p>
                <p>Display and sell your custom merch</p>
              </div> 
            </div>
            <div className={styles.Container}>
              <img src="./icon4.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Books</p>
                <p>Promote books on your Linktree</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon5.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Buy Me A Gift</p>
                <p>Let visitors support you with a small gift</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon6.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Cameo</p>
                <p>Make impossible fan connections possible</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon7.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Clubhouse</p>
                <p>Let your community in on the conversation</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon8.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Community</p>
                <p>Build an SMS subscriber list</p>
              </div>
            </div>
            <div className={styles.Container}>
              <img src="./icon9.png" alt="" />
              <div className={styles.ContainerDetails}>
                <p>Contact Details</p>
                <p>Easily share downloadable contact details</p>
              </div>
            </div>        
          </section>
          <br /><br /><br /><br />

          <footer className={styles.landingPagefooter}>
            <div className={styles.footerSide1}>
              <div className={styles.footerBtn}>
                <button  onClick={()=>navigate("/signin")} className={styles.footerBtnLogIn}>Log in</button>
                <button  onClick={()=>navigate("/signup")} className={styles.footerBtnSignUp}>Sign up free</button>
              </div>
              <div className={styles.footerSide2}>
                
                <p>About CNNCT</p>
                <p>Careers</p>
                <p>Terms and Conditions</p>
                <p>Blog</p>
                <p>Getting Started</p>
                <p>Privacy Policy</p>
                <p>Press</p>
                <p>Features and How-Tas</p>
                <p>Cookie Notice</p>
                <p>Social Good</p>
                <p>FAQs</p>
                <p>Trust Center</p>
                <p>Contact</p>
                <p>Report a Violation</p>
              </div>
            </div>
            <button  onClick={()=>navigate("/signup")} className={styles.footerBtnSignUpMobile}>Sign up free</button>
            <div  className={styles.footerSide3}>
              <p>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.</p>
              

              
              <div className={styles.footerIcon}>

                <img src="./twitter.png" alt="" />
                <img src="./insta.png" alt="" />
                <img src="./youtube.png" alt="" />
                <img src="./tiktok.png" alt="" />
                <img src="./cnn.png" alt="" />
              </div>
            </div>
          </footer>
          
          </main>

        </main>
    </div>
  )
}
