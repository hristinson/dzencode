import "./index.scss";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home">
        Use our service – it's the best! Other services just don't compare.
      </div>
      <div className="readme_container">
        <div className="readme_incoming">
          The <b>Incoming Menu</b> displays all incoming committers. This menu
          <br />
          allows users to keep track of all individuals or entities who are
          adding
          <br />
          new items or making contributions to the system. It serves as a log of
          <br />
          incoming activities, ensuring that all contributors are listed and can
          <br />
          be associated with the products they bring.
        </div>
        <div className="readme_product">
          The <b>Products Menu</b> contains all the products that have been
          accounted
          <br />
          for. Each product listed in this menu corresponds to an entry that has
          <br />
          been processed and added to the system. This menu gives a
          comprehensive
          <br />
          view of all products available, enabling users to track and manage
          their inventory
        </div>
        <div className="readme_other">
          When adding a product to the system, it is essential to choose the
          <br />
          appropriate incoming entity. This selection determines where the
          product
          <br />
          will be stored or linked within the system, ensuring proper tracking
          and
          <br />
          categorization. Each product must be associated with an incoming
          entity
          <br />
          to maintain a clear and organized record of its origin. In essence,
          <br />
          these two menus—Products and Incoming—work together to provide a<br />
          structured, transparent process for managing products and tracking
          their
          <br />
          sources. They ensure that every item is properly accounted for and
          <br />
          associated with the right contributor, facilitating smooth operations
          <br />
          within the system.
        </div>
      </div>
    </div>
  );
};

export default Home;
