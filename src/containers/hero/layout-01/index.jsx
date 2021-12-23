import PropTypes from "prop-types";
import Typed from "react-typed";
import Social, { SocialLink } from "@ui/social";
import SkillShare, { SkillItem } from "@ui/skill-share";
import Image from "@ui/image";
import sanityClient from "../../../client";
import React, { useEffect, useState } from "react";
import Button from "@ui/button";
import Icon from "@ui/icon";
import Pdf from "../../../assets/my-resume.pdf";
import {
    ImageType,
    HeadingType,
    TextType,
    SocialType,
    SkillType,
} from "@utils/types";
import { SocialIcon} from "react-social-icons";
import { ChevronRight } from "react-feather";

const HeroArea = ({ data, id }) => {

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
                name,
                bio,
                "authorImage": image.asset->url            
            }`
        ).then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, []);

    if(!author){
        return <div>No Info</div>
    }

    return (
        <div id={id} className="rn-slider-area">
            <div className="slide slider-style-1">
                <div className="container">
                    <div className="row row--30 align-items-center">
                        <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
                            <div className="content">
                                <div className="inner">
                                    {data?.headings?.[0] && (
                                        <span className="subtitle">
                                            {data.headings[0].content}
                                        </span>
                                    )}

                                    {data?.headings?.[1] && (
                                        <h1 className="title">
                                            <span
                                                style={{color: "#4eff3f"}}>
                                                Reggie Padgett II
                                            </span>
                                            <br />
                                            {data?.animated_texts && (
                                                <span
                                                    className="header-caption"
                                                    id="page-top"
                                                >
                                                    <span className="cd-headline clip is-full-width">
                                                        <span>a </span>{" "}
                                                        <Typed
                                                            className="animated-texts"
                                                            strings={
                                                                data.animated_texts
                                                            }
                                                            typeSpeed={50}
                                                            backSpeed={50}
                                                            backDelay={1}
                                                            loop
                                                            smartBackspace
                                                        />
                                                    </span>
                                                </span>
                                            )}
                                        </h1>
                                    )}
                                    {data?.texts?.[0] && (
                                        <div>
                                            <p className="subtitle">
                                                {data.texts[0].content}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12">
                                        <div className="social-share-inner-left">
                                            <span className="title">
                                                Contact Me
                                            </span>
                                            <div>
                                                <span className="p-3">
                                                   <SocialIcon url="https://www.linkedin.com/in/reginaldpadgett2/" />
                                                </span>
                                                <span className="p-3">
                                                   <SocialIcon  url="mailto:reggie.padgett2@gmail.com" />
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt--45 col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12 mt_mobile--30">
                                        <a href={Pdf}>
                                            <Button renderAs="button" className="thumbs-icon">
                                                <span>Resume</span>
                                            </Button>
                                        </a>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/*<div className="order-1 order-lg-2 col-lg-5">*/}
                        {/*    {data?.images?.[0]?.src && (*/}
                        {/*        <div className="thumbnail">*/}
                        {/*            <div className="inner">*/}
                        {/*                <Image*/}
                        {/*                    src={data.images[0].src}*/}
                        {/*                    alt={data.images[0]?.alt || "Hero"}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

HeroArea.propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
         headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
        animated_texts: PropTypes.arrayOf(PropTypes.string),
        socials: PropTypes.arrayOf(PropTypes.shape(SocialType)),
        skills: PropTypes.arrayOf(PropTypes.shape(SkillType)),
        images: PropTypes.arrayOf(PropTypes.shape(ImageType)),
    }),
};

HeroArea.defaultProps = {
    id: "home",
};

export default HeroArea;
