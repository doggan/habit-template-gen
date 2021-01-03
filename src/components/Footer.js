const Footer = () => {
  return (
    <div>
      <div className="ui divider"></div>
      <h4 className="ui center aligned header">
        Built by{" "}
        <a href="http://shy.am/" target="_blank" rel="noopener noreferrer">
          Shyam Guthikonda
        </a>{" "}
        in 2021
      </h4>
      <h2 className="ui center aligned header">
        <a
          href="https://github.com/doggan/habit-template-gen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i aria-hidden="true" className="github icon large"></i>
        </a>
      </h2>
    </div>
  );
};

export default Footer;
