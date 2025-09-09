import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getIncomings } from "../../api";
import { AddIncomingForm, DeleteIncomingForm } from "../form/";
import useText from "../../lib/useText";
import Loader from "../loader";
import "./index.scss";

const IncomingsList = () => {
  const navigate = useNavigate();
  const [idShowModal, setIsShowModal] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [deletedIncomingId, setDeletedIncomingId] = useState("");
  const closeModal = useCallback(() => {
    setIsShowModal(false);
    window.location.reload();
  }, []);

  const { t } = useText();
  const [incomings, setIncomings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIncomings = async () => {
    try {
      setLoading(true);
      const incomings = await getIncomings();
      setIncomings(incomings.incomings);
    } catch (err) {
      console.error("Error fetching incomings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (productId: string) => {
    navigate(`/products?searchByIncoming=${productId}`);
  };

  useEffect(() => {
    fetchIncomings();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <AddIncomingForm showModal={idShowModal} closeModal={closeModal} />
      <DeleteIncomingForm
        showModal={isShowDelete}
        closeModal={closeModal}
        id={deletedIncomingId}
      />
      <div className="add-incoming-button-container">
        <button
          onClick={() => setIsShowModal(true)}
          className="btn btn-success btn-sm"
        >
          Add
        </button>
      </div>

      <div className="table-responsive list">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t("incoming_name")}</th>
              <th>{t("date")}</th>
              <th>{t("local_incoming")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {incomings &&
              incomings.map((incoming) => (
                <tr key={incoming._id}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(incoming._id)}
                  >
                    <Link to={`/products?searchByIncoming=${incoming._id}`}>
                      {incoming.name}
                    </Link>
                  </td>
                  <td>{incoming.date}</td>
                  <td>
                    {!!incoming.isItNew ? (
                      <span className="text-success">&#10003;</span>
                    ) : (
                      <span className="text-danger">&#10007;</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn  btn-light btn-sm"
                      onClick={() => {
                        setDeletedIncomingId(incoming._id);
                        setIsShowDelete(true);
                      }}
                    >
                      <span className="text-danger">&#10007;</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default IncomingsList;
