"use client";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";
import TextInput from "@/components/form/TextInput";
import { LoginSchema } from "@/validation/schemas/LoginSchema";
import { useState } from "react";
import { AlertView } from "@/components/AlertView";
import AlertProp from "@/types/alertProp";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { signInUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [animationParent] = useAutoAnimate();
  const [message, setMessage] = useState<AlertProp | null>(null);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ login: "" }}
      onSubmit={async (values, actions) => {
        setMessage(null);
        const res = await fetch(`https://api.github.com/users/${values.login}`);
        const data = await res.json();

        actions.setSubmitting(false);

        if (res.status === 404) {
          setMessage({ type: "error", message: "User not found" });
          return;
        }

        signInUser(data);
        router.push("/repos");
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting }) => (
        <Form
          className={
            "w-[400px] flex flex-col items-center justify-center gap-6 p-2"
          }
          ref={animationParent}
        >
          <h1 className="text-3xl font-bold">Log in to Git Insight</h1>
          <h2 className={"text-center"}>
            Sign in to GitInsight for seamless access to GitHub user data and
            insights
          </h2>

          <TextInput
            name={"login"}
            placeholder={"GitHub Login"}
            fullWidth={true}
          />

          {message && (
            <AlertView type={message.type} message={message.message} />
          )}
          <Button
            type={"submit"}
            // color="primary"
            isLoading={isSubmitting}
            className={"w-full"}
          >
            Continue with GitHub
          </Button>
        </Form>
      )}
    </Formik>
  );
}
