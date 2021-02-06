import React from "react";
import { Form, Field } from "react-final-form";

const required = (value) => (value ? undefined : "This field is required!");

function AddTransactionForm({}) {
    return (
        <Form
            onSubmit={console.log}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="description" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Description</label>
                                <input
                                    {...input}
                                    type="text"
                                    placeholder="Description"
                                />
                                {meta.error && meta.touched && (
                                    <span>{meta.error}</span>
                                )}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="amount"
                        validate={required}
                        parse={(value) => parseFloat(value, 10)}
                        // format={}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Amount</label>
                                <input
                                    {...input}
                                    type="number"
                                    step="0.01"
                                    placeholder="Amount"
                                />
                                {meta.error && meta.touched && (
                                    <span>{meta.error}</span>
                                )}
                            </div>
                        )}
                    </Field>
                    <Field name="category" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Category</label>
                                {/* select */}
                                <input
                                    {...input}
                                    type="text"
                                    placeholder="Category"
                                />
                                {meta.error && meta.touched && (
                                    <span>{meta.error}</span>
                                )}
                            </div>
                        )}
                    </Field>
                    <Field name="date" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Date</label>
                                <input
                                    {...input}
                                    type="date"
                                    placeholder="Date"
                                />
                                {meta.error && meta.touched && (
                                    <span>{meta.error}</span>
                                )}
                            </div>
                        )}
                    </Field>

                    <div className="buttons">
                        <button type="submit" disabled={submitting}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            )}
        />
    );
}

export default AddTransactionForm;
