import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthYearForm = ({ setError, authors }) => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (authors != null) {
      let tempOptions = [];
      authors.forEach((author) => {
        tempOptions.push({ value: author.name, label: author.name });
      });

      setOptions(tempOptions);
    }
  }, [authors]);

  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    const bornInt = Number(born);
    changeBirthYear({ variables: { name: author.value, setBornTo: bornInt } });

    setAuthor("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={author}
            onChange={setAuthor}
            options={options}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
