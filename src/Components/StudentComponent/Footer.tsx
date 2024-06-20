function Footer() {
  return (

    <footer className="bg-blue-400   ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a className="flex items-center">
              <img
                src="../images/PaperPencil.png"
                className="w-52 me-3 "
                alt="FlowBite Logo"
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Resources
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="" className="hover:underline">
                    Support
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Follow us
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a
                    href=""
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Legal
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center ">
            © 2024
            <a href="" className="hover:underline">
              PaperPencil™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
 
  );

}

export default Footer;
