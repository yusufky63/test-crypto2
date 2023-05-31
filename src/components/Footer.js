import React from "react";
import TwitterIcon from "../assets/icon/TwitterIcon"
import GithubIcon from "../assets/icon/GithubIcon"

function Footer() {
  return (
    <section className="mt-50">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              rel="noreferrer"
              target={"_blank"}
              href="https://codexsha.tech"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Hakkımda
            </a>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <a
            target={"_blank"}
            href="https://twitter.com/codexsha"
            className="text-gray-400 hover:text-gray-500"
            rel="noreferrer"
          >
            <span className="sr-only">Twitter</span>
          <TwitterIcon />
          </a>
          <a
            target={"_blank"}
            href="https://github.com/yusufky63"
            className="text-gray-400 hover:text-gray-500"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub</span>
           <GithubIcon />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2022 CodeXSha, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
