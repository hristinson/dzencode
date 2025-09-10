import React, { useState } from "react";
import { addIncoming } from "../../../api";
import { newIncoming } from "../../../models";
import useText from "../../../lib/useText";
import { deleteIncoming } from "../../../api";
interface IncomingFormProps {
  showModal: boolean;
  closeModal: () => void;
  id?: string;
}

export const AddIncomingForm = (props: IncomingFormProps) => {
  const { t } = useText();
  const [incomingData, setIncomingData] = useState<newIncoming>({
    name: "",
    isItNew: false,
    date: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    switch (name) {
      case "isItNew":
        setIncomingData({
          ...incomingData,
          isItNew: !incomingData.isItNew,
        });
        break;
      default:
        setIncomingData({
          ...incomingData,
          [name]: value,
        });
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (incomingData.name.trim() === "") {
      setLoading(false);
      setError("Please enter Name of Incoming manager");
      return;
    }

    try {
      await addIncoming(incomingData);
      props.closeModal();
    } catch (err) {
      setError("Error adding produtc");
      console.error("Error:", err);
    }
    props.closeModal();
    setLoading(false);
  };

  return (
    <div>
      {props.showModal && <div className="modal-backdrop fade show"></div>}
      <dialog open={props.showModal} className="dialog">
        <p className="dialog-header">{t("please_input_data")}</p>
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="container">
            <div>
              <div>
                <label>Name of Incoming manager:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={incomingData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Date</label>
                <input
                  className="form-control"
                  type="text"
                  name="specification"
                  value={incomingData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group pt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isItNew"
                  checked={incomingData.isItNew}
                  onChange={handleChange}
                />
                <label className="form-check-label">Local Incoming</label>
              </div>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success btn-sm my-btn"
          >
            {loading ? t("adding") : t("add_new_incoming")}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              props.closeModal();
            }}
          >
            {"Close"}
          </button>
        </form>
      </dialog>
    </div>
  );
};

export const DeleteIncomingForm = (props: IncomingFormProps) => {
  const { t } = useText();
  return (
    <div>
      {props.showModal && <div className="modal-backdrop fade show"></div>}
      <dialog open={props.showModal} className="dialog">
        <h4 className="modal-title text-center mb-4">{t("are_you_sure")}</h4>
        <button
          type="submit"
          className="btn btn-danger btn-sm my-btn me-2"
          onClick={(e) => {
            props.id && deleteIncoming(props.id);
            e.preventDefault();
            props.closeModal();
          }}
        >
          <i className="bi bi-trash"></i> Delete
        </button>

        <button
          className="btn btn-secondary btn-sm my-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.closeModal();
          }}
        >
          <i className="bi bi-x-circle"></i> Close
        </button>
      </dialog>
    </div>
  );
};
