const { useState, useEffect } = React;
// Pull JSON file and process it
let jsonNodes = document.getElementById("items-json").innerHTML;
// Fix formatting before processing
jsonNodes = jsonNodes.replaceAll(/},\s*]}/g, "}]}").replace("]},]}", "]}]}");
const datasources = JSON.parse(jsonNodes);

let lazyLoadInstance = new LazyLoad({});

// Filter and make categories
const categories = ["All"];
datasources.nodes.forEach((a, b) => {
  const category = a.category;
  if (!categories.includes(category)) categories.push(category);
});

function NodePreview(props) {
  return (
    <a
      className="nodePreview_minimalArrow-url border-radius-3 medium cc_node_preview box-shadow"
      href={"./" + props.href}
      id={"node-" + props.id}
      key={props.id}
    >
      <div className="image-ctr animation-imageLoading">
        <img
          className="first-carousel-img lazy objectfit-cover scale-nodeImg entered loading"
          data-src={
            "./" + props.heroImg
              ? props.heroImg
              : props.carouselImg + "/2022_qrh_nodePreview_square_01/?m=nbf"
          }
          alt=""
          title={props.name}
        />
      </div>
      <div className="node-preview-content-ctr flex-row  pb-1">
        <div className="node-name light  heading-lg  heading-font">{props.name}</div>
        <div
          id="arrow-icon"
          className="nbf_tpl_text arrow-icon border-radius-2  transition-200"
        >
          <svg
            className="default-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7.86"
          >
            <path
              className="default-svg-fill"
              d="M18 3.93c0 .1-.03.2-.08.28l-.03.04-.07.07-.04.03-3.36 3.36c-.09.1-.22.15-.35.15s-.26-.05-.35-.15a.48.48 0 0 1 0-.7l2.57-2.58H.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h15.79L13.72.85c-.2-.19-.2-.51 0-.71s.51-.19.7 0l3.36 3.37.04.03.07.07.03.04c.05.08.08.18.08.28Z"
            ></path>
          </svg>
        </div>
      </div>
    </a>
  );
}

function App() {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [nodeList, setNodeList] = useState(datasources.nodes);
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(6);

  let displayedResultsNum = pageNumber * resultsPerPage;

  let nodes;
  // Filter based on category
  if (currentCategory == "All") {
    nodes = nodeList;
  } else nodes = nodeList.filter((a, b) => a.category === currentCategory);

  let maxResults = Math.min(displayedResultsNum, nodes.length);

  let filteredNodes = [];
  for (let i = 0; i < maxResults; i++) {
    const node = nodes[i];
    filteredNodes.push(NodePreview(node));
  }

  function Nav(props) {
    // Create the nav buttons
    const navButtons = categories.map((category, key) => {
      return (
        <li className="category-button-ctr" key={key}>
          <button
            className={
              "category-link" +
              (currentCategory === category ? " active-category " : "")
            }
            onClick={() => {
              categoryBtnHandler(category);
            }}
            data-category={category}
          >
            {category}
          </button>
        </li>
      );
    });

    return (
      <nav className="pageFilters-wrap">
        <ul className="categories-button-list">{navButtons}</ul>
      </nav>
    );
  }

  function LoadMoreButton(props) {
    function buttonHandler() {
      setPageNumber(pageNumber + 1);
    }
    return (
      <button
        disabled={props.disable}
        onClick={buttonHandler}
        className="button-secondary"
      >
        Load more
      </button>
    );
  }

  function categoryBtnHandler(input) {
    setCurrentCategory(input);
    setPageNumber(1);
  }

  useEffect(() => {
    lazyLoadInstance.update();
  });

  return (
    <section id="container">
      <header className="medium heading-font contentwidth guttercontentwidth mb-3 noselect">
        <Nav category={currentCategory} />
      </header>
      <div className="post-container contentwidth guttercontentwidth">
        {filteredNodes}
      </div>
      <div className="pagination-bar mt-2 mb-5">
        <LoadMoreButton disable={maxResults >= nodes.length} />
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
