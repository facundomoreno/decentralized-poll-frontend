"use client"
import { Field, Formik } from "formik"
import * as Yup from "yup"
import PollOptionsField from "../components/PollOptionsField"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import useCreatePoll from "@/hooks/useCreatePoll"
import { ThreeDots } from "react-loader-spinner"
import { useRouter } from "next/navigation"

const PollCreationValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Min of 2 characters").max(60, "Max of 60 characters").required("Required"),
    description: Yup.string().max(500, "Max of 500 characters").required("Required"),
    closesAt: Yup.date()
        .test("test-name", "The poll should have at least 10 minutes", function (value) {
            return dayjs(value).isAfter(dayjs()) && Math.abs(dayjs().diff(dayjs(value), "minute")) > 10
        })
        .required("Required"),
    options: Yup.array()
        .of(Yup.string().min(1, "Min of 1 character").max(60, "Max of 60 characters").required("Required"))
        .min(2, "Min of 2 options")
        .max(50, "Max of 50 options")
        .required("Required"),
    allowMultipleOptions: Yup.boolean().required("Required")
})
export default function CreatePoll() {
    const { createPoll, isUploading } = useCreatePoll()
    const router = useRouter()

    const handleUploadPoll = (values: any) => {
        const { name, description, closesAt, options, allowMultipleOptions } = values
        const closesAtToUnix = dayjs(closesAt).unix()

        createPoll({
            name,
            description,
            closesAt: closesAtToUnix,
            options,
            allowMultipleOptions
        })
            .then(() => {
                router.push("/")
            })
            .catch((e) => {
                alert("Something ocurred while creating poll. Please check your Metamask connection")
                throw e
            })
    }

    return (
        <div className="min-h-screen flex justify-center pt-8 pb-16">
            <div className="lg:w-1/2 px-16 md:px-0 lg:px-0">
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
                        onSubmit={(values, {}) => handleUploadPoll(values)}
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
                                <div>
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
                                    <div id="closeDate" className="w-full md:w-1/2 lg:w-/2">
                                        <MobileDateTimePicker
                                            onChange={(newValue) => {
                                                setFieldValue("closesAt", dayjs(newValue))
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

                                    <div className="w-full sm:w-full md:w-full [@media(min-width:1350px)]:w-1/2 mt-8">
                                        <PollOptionsField
                                            onPollOptionsChanged={(newPollOptions: string[]) => {
                                                setFieldValue("options", newPollOptions)
                                            }}
                                        />

                                        {errors.options && touched.options && (
                                            <p className="mt-2 text-red-400">Required</p>
                                        )}

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
                                            disabled={isUploading}
                                            className={`flex items-center justify-center w-full px-0 sm:px-16 md:px-28 lg:px-32 py-4 mt-12 text-white font-bold rounded ${
                                                isUploading ? "bg-gray-700" : "bg-orange-600 hover:bg-orange-700"
                                            }`}
                                        >
                                            {isUploading ? (
                                                <ThreeDots
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    color="#ffd4a3"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                />
                                            ) : (
                                                <p>Create Poll</p>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
