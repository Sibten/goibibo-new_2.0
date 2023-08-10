import { Button, Input, Radio } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { People, Traveller } from "../../../Types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Form({
  name,
  number,
  type,
  callback,
}: {
  name: string;
  number: number;
  type: number;
  callback: Function;
}) {
  const [rawForm, setRawForm] = useState<Array<React.ReactElement>>([]);

  const [formData, setFormData] = useState<Array<Traveller>>([]);

  const validateAge = (value: number, type: number) => {
    switch (type) {
      case People.Adult:
        return value > 18;
      case People.Child:
        return !!(value > 2 && value <= 18);
      case People.Infant:
        return !!(value > 0 && value <= 2);
    }
  };

  const [Message, setMessage] = useState<Array<string>>([]);
  const [SuccessMsg, setSuccess] = useState<string>("");

  const nameRegx = /[a-zA-Z]/;

  const selector = useSelector((state: RootState) => state.BookingDetails);

  useEffect(() => {
    rawForm.splice(0, rawForm.length);
    formData.splice(0, formData.length);
    for (let i = 0; i < number; i++) {
      formData.push({
        type: type,
        first_name: selector.basic.people[i]?.first_name ?? "",
        last_name: selector.basic.people[i]?.last_name ?? "",
        gender: selector.basic.people[i]?.gender ?? "",
        age: selector.basic.people[i]?.age ?? 0,
      });
      rawForm.push(
        <div key={i}>
          <h1 className="mx-2 my-1">
            {name} {i + 1}
          </h1>
          <div className="flex w-full flex-wrap">
            <div className="mx-1">
              {" "}
              <Input
                label="First Name*"
                defaultValue={formData[i].first_name}
                onBlur={(e) => {
                  if (e.target.value != "" && nameRegx.test(e.target.value)) {
                    formData[i].first_name = e.target.value;
                    setFormData([...formData]);
                    Message.splice(i, 1);
                  } else {
                    Message[i] = "Name can contain only alphabets";
                    setMessage([...Message]);
                  }
                }}
              />{" "}
            </div>
            <div className="mx-1">
              {" "}
              <Input
                label="Last Name*"
                defaultValue={formData[i].last_name}
                onBlur={(e) => {
                  if (e.target.value != "" && nameRegx.test(e.target.value)) {
                    formData[i].last_name = e.target.value;
                    setFormData([...formData]);
                    Message.splice(i, 1);
                  } else {
                    Message[i] =
                      "Name can contain only alphabets not even white space.";
                    setMessage([...Message]);
                  }
                }}
              />
            </div>
            <div className="w-24 overflow-hidden relative">
              <small className="absolute bg-gray-200 mx-2 -mt-1 px-1">
                Age*
              </small>
              <input
                type="number"
                min={0}
                defaultValue={formData[i].age}
                onBlur={(e) => {
                  if (validateAge(parseInt(e.target.value), type)) {
                    formData[i].age = parseInt(e.target.value);
                    setFormData([...formData]);
                    Message.splice(i, 1);
                    setMessage([...Message]);
                  } else {
                    Message[i] = `Invalid Age of passanger ${i + 1}`;
                    setMessage([...Message]);
                  }
                }}
                className="border placeholder:text-gray-600 p-2 w-full border-gray-500 rounded-md bg-transparent"
              />
            </div>
            <div>
              <Radio
                name={`gender-${i}-${type}`}
                label="Male"
                onChange={() => {
                  formData[i].gender = "Male";
                  setFormData([...formData]);
                }}
                defaultChecked={formData[i].gender == "Male"}
              />
              <Radio
                name={`gender-${i}-${type}`}
                label="Female"
                onChange={() => {
                  formData[i].gender = "Female";
                  setFormData([...formData]);
                }}
                defaultChecked={formData[i].gender == "Female"}
              />
            </div>
          </div>
        </div>
      );
    }
    setRawForm([...rawForm]);
  }, []);

  return (
    <div>
      <div className="m-2">
        <div>
          {rawForm.map((s) => {
            return s;
          })}
        </div>
        <div></div>
        <div className="m-2 flex">
          <Button
            className="bg-pink-600"
            onClick={() => {
              let f = formData.findIndex(
                (s) =>
                  s.first_name == "" ||
                  s.last_name == "" ||
                  !s.age ||
                  s.gender == ""
              );
              if (f != -1) {
                Message[0] = "Please Enter Valid Input! All Field are required";
                setMessage([...Message]);
                setTimeout(() => {
                  Message.splice(0, 1);
                }, 200);
              } else if (Message.length > 0) {
                Message[0] =
                  "Please Enter the valid Age. Age must be >18 for Adult, For Child >2<18. For Infants >0<2";
                setMessage([...Message]);
                setTimeout(() => {
                  Message.splice(0, 1);
                }, 200);
              } else {
                callback(formData);
                setSuccess("Successfully Saved!");
                // setMessage([...Message]);
              }
            }}
          >
            Save
          </Button>
          {Message.length > 0 ? (
            <p className="text-red-500 my-2 mx-2"> {Message.concat(" ")}</p>
          ) : (
            ""
          )}
          {SuccessMsg ? (
            <p className="text-green-500 my-2 mx-2">{SuccessMsg}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
