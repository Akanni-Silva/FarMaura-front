/* eslint-disable prefer-const */
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center  bg-blue-600 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Farmaura | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/akannisilva/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogoIcon size={48} weight="bold" />
            </a>
            <a
              href="https://github.com/Akanni-codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={48} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/0batayie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogoIcon size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer