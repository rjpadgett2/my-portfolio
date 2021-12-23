import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImageType, TextType } from "@utils/types";
import Image from "@ui/image";
import Anchor from "@ui/anchor";
import Icon from "@ui/icon";
import PortfolioModal from "@components/modal-portfolio";

const PortfolioCard = ({ title, appLink, githubLink, image, texts, id, slug }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div
                className="rn-portfolio"
                onClick={() => setShow(true)}
                onKeyPress={() => setShow(true)}
                role="button"
                tabIndex="-1"
            >
                <div className="inner">
                    <div className="thumbnail">
                        <Anchor href="#!">
                            <Image src={image.asset.url} alt={image.alt} />
                        </Anchor>
                    </div>
                    <div className="content">
                        <h4 className="title">
                            <Anchor>
                                {title}
                                <Icon name="ArrowUpRight" />
                            </Anchor>
                        </h4>
                    </div>
                </div>
            </div>
            <PortfolioModal
                show={show}
                setShow={setShow}
                title={title}
                image={image}
                texts={texts}
                githubLink={githubLink}
                appLink={appLink}
                slug={slug}
                id={id}
            />
        </>
    );
};

PortfolioCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
    image: PropTypes.shape(ImageType).isRequired,
    path: PropTypes.string.isRequired,
    texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
};

export default PortfolioCard;
