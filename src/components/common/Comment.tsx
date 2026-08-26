import { Star } from "lucide-react";
import Image from "next/image";

type Props = {
  score: number;
  body: string;
  date: Date;
  username: string;
  userImage: string | null;
};

const Comment = ({ score, body, date, username, userImage }: Props) => {
  return (
    <div className="w-full bg-white rounded-lg mt-5 p-4 flex gap-4 items-center border border-grey220">
      <Image
        src={userImage || "/images/user.png"}
        width={200}
        height={200}
        className="size-12 rounded-full border border-grey220"
        alt="user img"
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-2.5 w-full">
          <p className="text-primary text-sm flex items-center gap-1">
            <span>{username}</span>
            <span className="text-gray-500 text-xs">
              {new Date(date).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          <div className="flex gap-0.5">
            {Array.from({ length: score }).map((_, idx) => (
              <Star
                key={`filled-${idx}`}
                className="fill-warning300 stroke-1 stroke-warning300 size-3.5"
              />
            ))}
            {Array.from({ length: 5 - score }).map((_, idx) => (
              <Star
                key={`empty-${idx}`}
                className="stroke-1 stroke-warning300 size-3.5"
              />
            ))}
          </div>
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Comment;