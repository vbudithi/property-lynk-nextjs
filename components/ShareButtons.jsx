import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  RedditIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = React.memo(function ShareButtons({ property }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  const title = property.name;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}forRent`}
          aria-label="Share on Facebook"
        >
          <div title="Facebook">
            <FacebookIcon size={40} round={true} />
          </div>
        </FacebookShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          seperator="::"
          aria-label="Share on Whatsapp"
        >
          <div title="Whatsapp">
            <WhatsappIcon size={40} round={true} />
          </div>
        </WhatsappShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={[`#${property.type}forRent`]}
          aria-label="Share on Twitter"
        >
          <div title="Twitter">
            <TwitterIcon size={40} round={true} />
          </div>
        </TwitterShareButton>
        <RedditShareButton
          url={shareUrl}
          title={title}
          aria-label="Share on Reddit"
        >
          <div title="Reddit">
            <RedditIcon size={40} round={true} />
          </div>
        </RedditShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={`Check out this property listing: ${shareUrl}`}
          separator="::"
          aria-label="Share on Email"
        >
          <div title="Email">
            <EmailIcon size={40} round={true} />
          </div>
        </EmailShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          aria-label="Share on Linkedin"
        >
          <div title="Linkedin">
            <LinkedinIcon size={40} round={true} />
          </div>
        </LinkedinShareButton>
      </div>
    </>
  );
});

export default ShareButtons;
