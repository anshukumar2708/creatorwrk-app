import { useState, useEffect, useRef } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AvatarImage = ({
  imageUrl,
  name,
  size,
  className,
}: {
  imageUrl: string | undefined | null;
  name?: string;
  size?: number;
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (avatarRef.current) {
      observer.observe(avatarRef.current);
    }

    return () => {
      if (avatarRef.current) {
        observer.unobserve(avatarRef.current);
      }
    };
  }, []);

  return (
    <div ref={avatarRef}>
      <Avatar
        src={
          isLoaded && imageUrl ? (
            <img src={imageUrl} alt={name || "avatar"} loading="lazy" />
          ) : undefined
        }
        icon={imageUrl === null && !name ? <UserOutlined /> : undefined}
        size={size}
        className={`${className} bg-smallBlue hover:scale-110`}
      >
        {!imageUrl && name && (
          <span className="text-bold capitalize">{name.slice(0, 1)}</span>
        )}
      </Avatar>
    </div>
  );
};

export default AvatarImage;
