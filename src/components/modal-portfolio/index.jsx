import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { X, ThumbsUp, ChevronRight } from "react-feather";
import Image from "@ui/image";
import Button from "@ui/button";
import { ImageType, TextType } from "@utils/types";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { Link, BrowserRouter } from 'react-router-dom';

const blocksToHtml = require('@sanity/block-content-to-html')
const builder = imageUrlBuilder(sanityClient);
const client = require('@sanity/client')({
    projectId: 'tqrff0gd',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
})
// `h` is a way to build HTML known as hyperscript
// See https://github.com/hyperhype/hyperscript for more info
const h = blocksToHtml.h


const serializers = {
    types: {
        youtube: ({node}) => {
            const { url } = node
            const id = getYouTubeId(url)
            return (<YouTube videoId={id} />)
        },
        code: props => (
            h('pre', {className: props.node.language},
                h('code', props.node.code)
            )
        ),
    },
    marks: {
        link: ({mark, children}) => {
            const {slug = {}} = mark
            const href = `/${slug.current}`
            return <a href={href}>{children}</a>
        }
    }
}

const PortfolioModal = ({
    show,
    setShow,
    image,
    title,
    id,
    slug,
    texts,
    githubLink,
    appLink,
}) => {
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            centered={true}
        >
            <Modal.Header>
                <Modal.Title
                    id="example-custom-modal-styling-title"
                    className="sr-only"
                >
                    Custom Modal Styling
                </Modal.Title>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShow(false)}
                >
                    <span aria-hidden="true">
                        <X />
                    </span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="portfolio-popup-thumbnail">
                            <div className="image">
                                <Image
                                    src={image.asset.url}
                                    alt={image?.alt}
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-content">
                            <BlockContent
                                blocks={texts}
                                projectId="tqrff0gd"
                                dataset="production"
                                serializers={serializers}
                            />
                            <div className="button-group mt--20">
                                <a href={githubLink}>
                                    <Button renderAs="button" className="thumbs-icon">
                                        <span>GitHub</span>
                                        <ChevronRight />
                                    </Button>
                                </a>
                                <a href={appLink}>
                                    <Button enderAs="button" className="thumbs-icon">
                                        <span>App Link</span>
                                        <ChevronRight />
                                    </Button>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

PortfolioModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    image: PropTypes.shape(ImageType).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
};

export default PortfolioModal;
