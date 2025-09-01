"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageCircle, MessageSquare, Share2, ThumbsUp } from "lucide-react";

dayjs.extend(relativeTime);

type User = {
  id: string;
  fullName: string;
  profilePhoto: string;
};

type Reaction = {
  id: string;
  type: string;
  user: User;
};

type Comment = {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  reactions?: Reaction[];
};

type Post = {
  id: string;
  description: string;
  thamble?: string;
  video?: string;
  createdAt: string;
  user: User;
  postReactions?: Reaction[];
  reactions?: Reaction[];
  comments: Comment[];
};

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const demoData: Post[] = [
      {
        id: "1",
        description: "This is my first post!",
        thamble:
          "https://lgcglobalcontractingltd.com/js/files/16db0ffa-9838-4909-90f9-433ea317e9d0.jpg",
        video:
          "https://lgcglobalcontractingltd.com/js/files/48bec27c-6751-45b6-a951-384131b7e359.mp4",
        createdAt: "2025-08-31T11:39:26.956Z",
        user: {
          id: "u1",
          fullName: "Hazel Wise",
          profilePhoto:
            "https://lgcglobalcontractingltd.com/js/files/fcc8e175-7ade-421c-96cd-14351fd6a801.jpg",
        },
        postReactions: [
          {
            id: "r1",
            type: "LIKE",
            user: {
              id: "u1",
              fullName: "Hazel Wise",
              profilePhoto:
                "https://lgcglobalcontractingltd.com/js/files/fcc8e175-7ade-421c-96cd-14351fd6a801.jpg",
            },
          },
        ],
        reactions: [
          {
            id: "r2",
            type: "LIKE",
            user: {
              id: "u1",
              fullName: "Hazel Wise",
              profilePhoto:
                "https://lgcglobalcontractingltd.com/js/files/fcc8e175-7ade-421c-96cd-14351fd6a801.jpg",
            },
          },
        ],
        comments: [
          {
            id: "c1",
            content: "This is a great post!",
            createdAt: "2025-08-31T11:41:10.683Z",
            user: {
              id: "u1",
              fullName: "Hazel Wise",
              profilePhoto:
                "https://lgcglobalcontractingltd.com/js/files/fcc8e175-7ade-421c-96cd-14351fd6a801.jpg",
            },
            reactions: [],
          },
        ],
      },
      {
        id: "2",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        thamble:
          "https://lgcglobalcontractingltd.com/js/files/99c0dc28-93e8-4e68-87f2-817bfe7e62e4.jpg",
        video:
          "https://lgcglobalcontractingltd.com/js/files/ce87eef7-dfec-4a6a-ab61-7e9e28985643.mp4",
        createdAt: "2025-08-30T10:20:00.000Z",
        user: {
          id: "u2",
          fullName: "John Doe",
          profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        reactions: [
          {
            id: "r3",
            type: "LIKE",
            user: {
              id: "u2",
              fullName: "John Doe",
              profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
            },
          },
        ],
        comments: [
          {
            id: "c2",
            content: "Nice one!",
            createdAt: "2025-08-30T11:00:00.000Z",
            user: {
              id: "u3",
              fullName: "Emily Clark",
              profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            reactions: [],
          },
        ],
      },
    ];

    setPosts(demoData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Post input box */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Current user"
              className="w-10 h-10 rounded-full"
            />
            <textarea
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700">
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md mb-6">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
              <img
                src={post.user.profilePhoto}
                alt={post.user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">{post.user.fullName}</h3>
                <p className="text-xs text-gray-500">
                  {dayjs(post.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-gray-800 text-sm mb-3">{post.description}</p>
              {post.video ? (
                <video
                  controls
                  className="w-full rounded-lg"
                  src={post.video}
                  poster={post.thamble}
                />
              ) : post.thamble ? (
                <img
                  src={post.thamble}
                  alt="Post thumbnail"
                  className="w-full rounded-lg"
                />
              ) : null}
            </div>

            {/* Post Stats */}
            <div className="px-4 pb-2 text-sm text-gray-500 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {post.reactions?.length || 0}
              </span>
              <span>{post.comments?.length || 0} Comments</span>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-b border-gray-200 flex justify-around py-2 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" />
                Like
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                Comment
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Comments Section */}
            <div className="p-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 mb-3">
                  <img
                    src={comment.user.profilePhoto}
                    alt={comment.user.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-2 text-sm">
                      <p className="font-semibold">{comment.user.fullName}</p>
                      <p>{comment.content}</p>
                    </div>
                    <div className="text-xs text-gray-500 flex gap-3 mt-1">
                      <span>{dayjs(comment.createdAt).fromNow()}</span>
                      <button className="hover:text-blue-600">
                        Like ({comment.reactions?.length || 0})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 mt-3">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Current user"
                  className="w-8 h-8 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
