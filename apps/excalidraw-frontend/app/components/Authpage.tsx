"use client";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/button";
import { HTTP_BACKEND } from "../config";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
export function Authpage({ isSignin }: { isSignin: boolean }) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function HandleSignup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    if (isSignin) {
      const response =
        await axios.post(`${HTTP_BACKEND}/Signin`, {
          username: username,
          password: password
        })
        if(response) {
        const jwt = response.data.token
        sessionStorage.setItem("token", jwt)
        }
        router.push("/Room")
    } else {
      (await axios.post(`${HTTP_BACKEND}/Signup`, {
        username: username,
        password: password,
        email: email,
      })) && router.push("/Signin");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center align-middle">
        <div className="p-10 m-2 bg-emerald-300 h-104 w-96 rounded-2xl place-content-center">
          <Input ref={usernameRef} type="text" placeholder="Username" />
          <br />
          <Input ref={passwordRef} type="password" placeholder="password" />
          <br />
          {!isSignin && (
            <span>
              <Input ref={emailRef} type="email" placeholder="Email" />
            </span>
          )}
          <br />
          <span className="flex items-center justify-center">
            <Button
              onClick={HandleSignup}
              text={isSignin ? "SignIn" : "SignUp"}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
