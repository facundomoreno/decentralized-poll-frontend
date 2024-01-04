"use client"
import { Field, Formik } from "formik"
import * as Yup from "yup"
import PollOptionsField from "../components/PollOptionsField"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import { styled } from "@mui/material"
import dayjs from "dayjs"

const PollCreationValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Min of 2 characters").max(40, "Max of 40 characters").required("Required"),
    description: Yup.string().max(500, "Max of 500 characters").required("Required"),
    closesAt: Yup.date().required("Required"),
    options: Yup.array()
        .of(Yup.string().min(1, "Min of 1 character").max(50, "Max of 50 characters").required("Required"))
        .min(2, "Min of 2 options")
        .max(50, "Max of 50 options")
        .required("Required"),
    allowMultipleOptions: Yup.boolean().required("Required")
})
export default function CreatePoll() {
    return (
        <div className="min-h-screen p-20">
            <h1 className="text-white text-3xl font-bold underline underline-offset-8">Creation of new poll</h1>
            <div className="pt-8">
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        closesAt: undefined,
                        options: [],
                        allowMultipleOptions: false
                    }}
                    validationSchema={PollCreationValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="lg:w-1/2">
                                <label className="text-white block text-md font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <Field id="name" name="name">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="name"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {errors.name && touched.name && (
                                                <p className="text-red-400">{errors.name}</p>
                                            )}
                                        </div>
                                    )}
                                </Field>

                                <br />

                                <label className="text-white block text-md font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <Field id="description" name="description">
                                    {({ form: { touched, errors } }: any) => (
                                        <div>
                                            <textarea
                                                style={{
                                                    resize: "none"
                                                }}
                                                className="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />
                                            {errors.description && touched.description && (
                                                <p className="text-red-400">{errors.description}</p>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <label className="text-white block text-md font-bold mb-2 mt-4" htmlFor="closeDate">
                                    Select the close date
                                </label>
                                <div id="closeDate" className="w-1/2">
                                    <MobileDateTimePicker
                                        onChange={(newValue) => {
                                            if (dayjs(newValue).diff(newValue, "second") < 10) {
                                                setFieldValue("closesAt", dayjs(newValue))
                                            }
                                        }}
                                        defaultValue={undefined}
                                        value={dayjs(values.closesAt)}
                                        className="bg-white rounded w-full"
                                        minDate={dayjs(new Date()).add(5, "minute")}
                                    />
                                </div>

                                {errors.closesAt && touched.closesAt && (
                                    <p className="mt-2 text-red-400">{errors.closesAt}</p>
                                )}

                                <div className="lg:w-1/2 sm:w-full mt-8">
                                    <PollOptionsField
                                        onPollOptionsChanged={(newPollOptions: string[]) => {
                                            setFieldValue("options", newPollOptions)
                                        }}
                                    />

                                    {errors.options && touched.options && <p className="mt-2 text-red-400">Required</p>}

                                    <div className="flex justify-end">
                                        <div className="flex items-center mt-4">
                                            <p className="text-white pr-2">
                                                Allow respondents to choose more than one option
                                            </p>
                                            <input
                                                type="checkbox"
                                                className="lg:translate-y-[1px] shadow border rounded h-4 w-4 accent-blue-600"
                                                onChange={(e) => {
                                                    setFieldValue("allowMultipleOptions", e.target.checked)
                                                }}
                                                checked={values.allowMultipleOptions}
                                            />
                                        </div>
                                    </div>

                                    {errors.allowMultipleOptions && touched.allowMultipleOptions && (
                                        <p className="text-red-400">{errors.allowMultipleOptions}</p>
                                    )}
                                </div>

                                <div className="flex justify-end items-center">
                                    <button
                                        type="submit"
                                        className="w-full px-32 py-4 mt-12 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create Poll
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
