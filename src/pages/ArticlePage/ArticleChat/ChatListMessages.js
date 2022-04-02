import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../components/Loader";
import EmptyState from "../../../domain/EmptyState";
import ChatMessage from "../../../components/ChatMessage";

const ChatListMessages = ({
  messages,
  error,
  isLoading,
  currentPage,
  pageCount,
  handlePagination,
}) => {
  const [fetching, setFetching] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const parentScrollRef = useRef(null);

  useEffect(() => {
    setFetching(false);
  }, [messages]);

  const handleScroll = (page) => {
    if (fetching || page < 2) return;
    setFetching(true);
    handlePagination(page);
  };

  useEffect(() => {
    const options = {
      root: parentScrollRef.current,
      rootMargin: "20%",
      threshold: 0,
    };

    const handleObserver = (entries) => {
      const [entry] = entries;
      if (!entry) return;
      const entryName = entry.target.dataset.name;
      if (entry.isIntersecting && entryName) {
        console.log("handleObserver:", entryName);
        handlePagination && handlePagination(entryName);
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const prevRefCurrent = prevRef.current;
    const nextRefCurrent = nextRef.current;

    if (prevRefCurrent) observer.observe(prevRef.current);
    if (nextRefCurrent) observer.observe(nextRef.current);

    return () => {
      if (prevRefCurrent) observer.unobserve(prevRefCurrent);
      if (nextRefCurrent) observer.unobserve(nextRefCurrent);
    };
  }, [prevRef, nextRef, handlePagination]);
  console.log(Array.isArray(messages[3]));
  console.log(messages[3]);
  const Messages = (data) => {
    if (isLoading) return <Loader />;
    if (error)
      return (
        <EmptyState
          type="warning"
          title="Упс... Произошла ошибка!"
          description={error.message}
        />
      );
    // console.log(Array.isArray(data));
    // console.log(Array.isArray(data.data));
    console.log(data.data);
    if (!(Array.isArray(data.data) && !!data.data.length))
      return (
        <EmptyState
          title="Сообщений пока нет"
          imgName="no_data"
          description="Тут будет история вашей переписки"
        />
      );

    const messages = data.data.map(
      ({ dateCreate, files, role, text }, index) => (
        <ChatMessage
          date={dateCreate}
          direction={!!role}
          text={text}
          ref={data.data.length - 1 === index ? nextRef : null}
          key={index}
          files={files}
        />
      )
    );
    return <>{messages}</>;
  };

  return (
    <div className="chat-box__body">
      <InfiniteScroll
        pageStart={0}
        isReverse
        loadMore={handleScroll}
        hasMore={currentPage !== pageCount}
        useWindow={true}
        loader={<Loader key={0} />}
      >
        <Messages data={messages[3]} />
      </InfiniteScroll>
    </div>
  );
};

export default ChatListMessages;
