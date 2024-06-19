import CreateBookForm from "../components/CreateBookForm";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
export const CreateBook = () => {
  return (
    <>
      <NavbarComponent />
      <div className="p-4">
        <CreateBookForm />
      </div>
      <FooterComponent />
    </>
  );
};
