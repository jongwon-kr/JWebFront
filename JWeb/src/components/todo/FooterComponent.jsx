import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container">
        <span>by Jongwon | </span>
        <a href="https://github.com/jongwon-kr/FunBitWeb">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}
