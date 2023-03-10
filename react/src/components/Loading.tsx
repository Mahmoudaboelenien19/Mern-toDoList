const Loading = () => {
  return (
    <div id="loading-container">
      {Array.from("loading").map((letter, index) => {
        return (
          <span
            style={{ animationDelay: `calc( 0.1s * ${index})` }}
            key={index}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default Loading;
