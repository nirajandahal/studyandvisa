'use client';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import Link from 'next/link';
import { Button } from 'libs/ui-components/src/components/ui/button';
import { Input } from 'libs/ui-components/src/components/ui/input';
import { FaceIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import {
  Facebook,
  FacebookIcon,
  Instagram,
  InstagramIcon,
  Mail,
  MailIcon,
} from 'lucide-react';

const MainMenu = () => (
  <div className="flex flex-col gap-2 items-start">
    <Link href="#" className="text-sm text-navy-blue hover:text-gray-600">
      Find Course
    </Link>
    <Link href="#" className="text-sm text-navy-blue hover:text-gray-600">
      Study Destination
    </Link>
    <Link href="/blog" className="text-sm text-navy-blue hover:text-gray-600">
      Blog
    </Link>
  </div>
);

const ContactDetails = () => (
  <div className="text-center ">
    <h2 className="text-sm ">
      Be the first one to know about opportunities, offers, and events
    </h2>
  </div>
);

const NewsletterForm = () => (
  <div className="text-center bg-light-gray">
    <div className="flex flex-col bg-light-gray md:flex justify-between   rounded">
      <div className="mb-3">
        <h2 className="text-sm ">
          Be the first one to know about opportunities, offers, and events
        </h2>
      </div>
      <div className="newsletter buttonInside relative">
        <div className="flex w-full bg-light-gray items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button
            className="w-full  px-6 py-3 bg-dark-blue text-white flex justify-center items-center rounded w-auto"
            type="submit"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const pathname = usePathname();
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in'];

  return (
    <footer className="bg-light-gray w-full justify-between px-5 sm:px-10 md:px-14 lg:px-24">
      <div className="border-t border-gray-200 w-full">
        {pathsToMinimize.includes(pathname) ? null : (
          <div className="relative flex flex-col w-full text-dark-blue justify-between sm:flex-row  py-6 sm:py-8 lg:mt-0">
            <div className="flex flex-col justify-between pr-8">
              <span className="font-bold tracking-tight text-dark-blue mb-3">
                Useful Links
              </span>
              <MainMenu />
            </div>

            {/* Middle part containing contact details */}
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-dark-blue mb-3">
                Contact Information
              </span>
              <ContactDetails />
            </div>

            {/* Right part containing newsletter form */}
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-dark-blue mb-3">
                Subscribe to our newsletter
              </span>
              <NewsletterForm />
            </div>
          </div>
        )}
      </div>

      <div className="py-5 flex flex-col md:flex-row  md:justify-between gap-2 h-full">
        <div className="md:text-left">
          <p className="text-sm  text-navy-blue">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        <div className="mt-4 justify-center md:mt-0">
          {/* Outer div with margin and alignment */}
          <div className="flex  space-x-4 sm:justify-center md:justify-center">
            {/* Social media links */}
            <Link
              href="#"
              className="text-sm text-navy-blue hover:text-gray-600"
            >
              {/* Facebook icon */}
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              className="text-sm text-navy-blue hover:text-gray-600"
            >
              {/* Instagram icon */}
              <InstagramIcon />
            </Link>
            <Link
              href="#"
              className="text-sm text-navy-blue hover:text-gray-600"
            >
              {/* Mail icon */}
              <MailIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
