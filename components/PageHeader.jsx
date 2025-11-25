import React from "react";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PageTitle from "./PageTitle";

const PageHeader = ({ href, title, backText }) => {
  return (
    <section>
      <div className="container mx-auto md:px-16 flex items-center justify-between mb-6">
        <Link
          href={href}
          className="flex text-blue-500 hover:underline mb-3 items-center"
          prefetch={false}
        >
          <FaArrowAltCircleLeft className="mr-2 align-middle" />
          {backText}
        </Link>
      </div>
      <PageTitle>{title}</PageTitle>
    </section>
  );
};

export default PageHeader;
