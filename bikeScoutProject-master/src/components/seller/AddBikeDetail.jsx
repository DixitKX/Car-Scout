import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const AddBikeDetail = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    const res = await axios.post("/bike/addbike", data);
    console.log(res.data);
  };
  return (
    <>
      <div className="app-wrapper">
        <div className="card card-info card-outline mb-4">
          <div className="card-header">
            <div style={{ paddingLeft: "40%" }} className="card-title">
              <h1>addCarDetail</h1>
            </div>
          </div>

          <form
            className="needs-validation"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Enter Car BrandName"
                    {...register("brand")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    model
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Enter Car modelName"
                    {...register("model")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    year
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car manufacture date"
                    {...register("year")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    variant
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car variant"
                    {...register("variant")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    mileage
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car mileage"
                    {...register("mileage")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    fuelType
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car fuelType"
                    {...register("fuelType")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    type
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter type of Car"
                    {...register("type")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    price
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car price"
                    {...register("price")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    color
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car color"
                    {...register("color")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    description
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car description"
                    {...register("description")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    listingDate
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter date "
                    {...register("listingDate")}
                  />

                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    registationNum
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Enter Car registationNum"
                    {...register("registationNum")}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    select state
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("stateId")}
                    onChange={(event) => {
                      getCityByStateId(event.target.value);
                    }}
                  >
                    <option selected="" disabled="" value="">
                      select state
                    </option>
                    {states?.map((state) => (
                      <option value={state._id}>{state.name}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid state.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    select city
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("cityId")}
                    onChange={(event) => {
                      getAreaByCityId(event.target.value);
                    }}
                  >
                    <option selected="" disabled="" value="">
                      select state
                    </option>
                    {cities?.map((city) => (
                      <option value={city._id}>{city.name}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid state.
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    select Area
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    {...register("areaId")}
                  >
                    <option selected="" disabled="" value="">
                      select Area
                    </option>
                    {areas?.map((area) => (
                      <option value={area._id}>{area.name}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid state.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center" }} className="card-footer">
              <button
                style={{ width: "300px", height: "60px", fontSize: "2rem" }}
                className="btn btn-info"
                type="submit"
              >
                addCarDetail
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
