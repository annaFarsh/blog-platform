import NotAccess from "../img/NotAccess.jpg";
function NotAccessPage() {
  return (
    <div className="not-access-page">
      <div>
        <img alt="sad cat" src={NotAccess} />
      </div>
      <div>Sorry, you are not authorized to access this page.</div>
    </div>
  );
}
export default NotAccessPage;
