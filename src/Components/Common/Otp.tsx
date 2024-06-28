import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import studentAPi from "../../API/studentAPI";
import instructorAPI from "../../API/instructor";
import { studentLogin } from "../../Redux/slice/student";

import { useDispatch } from "react-redux";
import { instructorLogin } from "../../Redux/slice/instructor";
import { toast } from "sonner";

function Otp({
  who,
  forgot,
}: {
  who: "instructor" | "student";
  forgot: boolean;
}) {
  const resendInstructor = async () => {
    try {
      const response = await instructorAPI.resendOtp();
      if (response.data.status) {
        toast.success(response.data.message);
        resetCountdown();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resendStudent = async () => {
    try {
      const response = await studentAPi.resend(forgot);
     

      if (response.status) {
        toast.success(response.message);
        resetCountdown();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resend = () => {
    if (who === "instructor") {
      resendInstructor();
    } else {
      resendStudent();
    }
  };

  const resetCountdown = () => {
    setCount(60);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(intervalId.current!);
          return prevCount;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  let intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    resetCountdown();
    return () => clearInterval(intervalId.current!);
  }, []);

  let dispatch = useDispatch();
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });
  const [fullOtp, setFullOtp] = useState("");
  const ref = useRef<HTMLInputElement[]>([]);
  let navigate = useNavigate();
  const [count, setCount] = useState<number>(60);

  useEffect(() => {
    const firstInput = ref.current[0];
    if (firstInput) {
      firstInput.focus();
      firstInput.addEventListener("paste", pasteText);
    }

    return () => {
      if (firstInput) {
        firstInput.removeEventListener("paste", pasteText);
      }
    };
  }, []);

  const pasteText = (event: ClipboardEvent) => {
    const pastedData = event.clipboardData?.getData("text") || "";
    const fieldValues: any = {};

    Object.keys(otp).forEach((key, index) => {
      fieldValues[key] = pastedData[index] || "";
    });

    setOtp(fieldValues);
    setFullOtp(pastedData);
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setOtp((prevOtp) => ({
      ...prevOtp,
      [name]: value.slice(-1),
    }));

    if (value && index < 3) {
      ref.current[index + 1].focus();
    }

    const newFullOtp = Object.values({
      ...otp,
      [name]: value.slice(-1),
    }).join("");

    setFullOtp(newFullOtp);
  }

  function handleBack(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (forgot) {
        const response = await studentAPi.confirmForgotOrp(parseFloat(fullOtp));
        if (response.data.status) {
          navigate("/setpassword");
        }
      } else if (who === "student") {
        
        
        let otpResponse = await studentAPi.confirmOtp(fullOtp);
        if (otpResponse.data.status) {
          dispatch(
            studentLogin({
              student: otpResponse.data.studentData,
            })
          );

          localStorage.setItem("studentToken", otpResponse.data.token);
          localStorage.removeItem('studentOtpToken');
          navigate("/");
        }
      } else if (who === "instructor") {
        console.log("stueknektnen");
        let otpResponse = await instructorAPI.confirm_otp(fullOtp);
        if (otpResponse.data.status) {
          dispatch(
            instructorLogin({
              instructor: otpResponse.data.instructorData,
            })
          );
          toast.success(otpResponse.data.message);
          localStorage.removeItem("instructorOtpToken");
          localStorage.setItem("instructorToken", otpResponse.data.token);
          navigate("/instructor/");
        }
      } else {
        // Handle unexpected scenario
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  const Render = () => {
    return (
      <>
        {Object.keys(otp).map((key, index) => (
          <div className="w-16 h-16" key={index}>
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name={key}
              onChange={(event) => onChange(event, index)}
              value={otp[key as keyof typeof otp]}
              onKeyUp={(event) => handleBack(event, index)}
              ref={(element) =>
                (ref.current[index] = element as HTMLInputElement)
              }
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex flex-row text-sm font-medium text-gray-400">
              <img width={200} src="../images/ppBlue.png" alt="logo" />
             
            </div>
            <div className="font-semibold text-3xl">
              <p className="font-Poppins text-black">Otp verification</p>
            </div>
          
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {Render()}
                </div>
                {count === 0 ? (
                  <h1 className="text-center  text-red-500">
                    Otp has been expired{" "}
                    <h2
                      className="text-decoration: underline text-blue-500 cursor-pointer"
                      onClick={resend}
                    >
                      resend Otp
                    </h2>
                  </h1>
                ) : (
                  <h1 className="text-center text-black">
                    Otp expires within: {count}
                  </h1>
                )}

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{' '}
                    <a className="flex flex-row items-center text-blue-600" href="#" target="_blank" rel="noopener noreferrer">
                      Resend
                    </a>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
