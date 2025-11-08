"use client";
import { Facebook, MessageSquare, Twitter } from "lucide-react";
import React from "react";
import { FaPinterest, FaVk, FaWhatsapp } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    contentUrl: string;
    contentTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
    isOpen,
    onClose,
    contentUrl,
    contentTitle,
}) => {
    if (!isOpen) return null;

    const handleShare = (platform: string) => {
        let shareUrl = "";
        switch (platform) {
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodeURIComponent(contentTitle + " " + contentUrl)}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contentUrl)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(contentUrl)}&text=${encodeURIComponent(contentTitle)}`;
                break;
            case "pinterest":
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(contentUrl)}&description=${encodeURIComponent(contentTitle)}`;
                break;
            case "takaoTalk":
                shareUrl = `https://talk.plus/app/share?url=${encodeURIComponent(contentUrl)}`;
                break;
            case "vk":
                shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(contentUrl)}`;
                break;
            default:
                return;
        }
        window.open(shareUrl, "_blank");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(contentUrl).then(() => {
            alert("URL copied to clipboard!");
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-xl font-semibold">Share this: {contentTitle}</h2>
                </DialogHeader>
                <div className="flex justify-center gap-4 items-center my-8">
                    {/* WhatsApp Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("whatsapp")}
                        className="rounded-full w-12 h-12 bg-green-500 text-white hover:bg-green-600"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                    </Button>

                    {/* Facebook Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("facebook")}
                        className="rounded-full w-12 h-12 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <Facebook className="w-5 h-5" />
                    </Button>

                    {/* Twitter Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("twitter")}
                        className="rounded-full w-12 h-12 bg-blue-400 text-white hover:bg-blue-500"
                    >
                        <Twitter className="w-5 h-5" />
                    </Button>

                    {/* Pinterest Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("pinterest")}
                        className="rounded-full w-12 h-12 bg-red-600 text-white hover:bg-red-700"
                    >
                        <FaPinterest className="w-5 h-5" />
                    </Button>

                    {/* TakaoTalk Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("takaoTalk")}
                        className="rounded-full w-12 h-12 bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </Button>

                    {/* VK Button */}
                    <Button
                        variant="outline"
                        onClick={() => handleShare("vk")}
                        className="rounded-full w-12 h-12 bg-violet-700 text-white hover:bg-violet-800"
                    >
                        <FaVk className="w-5 h-5" />
                    </Button>
                </div>
                <DialogFooter className="w-full">
                    <div className="flex items-center gap-2 w-full">
                        <Input type="text" value={contentUrl} readOnly className="w-full flex-1" />
                        <Button variant="outline" onClick={handleCopy}>Copy</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;
