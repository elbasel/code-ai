import { Button } from "@components/Button";
import { TextInput } from "@components/Input/TextInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";

type AddToDatabaseProps = {};

export const AddToDatabase = ({}: AddToDatabaseProps): React.ReactElement => {
  // user inputs state
  const [inputString, setInputString] = useState("");
  const [isInputStringValid, setIsInputJSONStringValid] = useState(true);
  const [tableNameString, setTableNameString] =
    useState<string>("fallbackTable");

  // api state
  const [loading, setLoading] = useState(false);
  const [responseJSON, setResponseObject] = useState<null | {}>(null);

  const [parent] = useAutoAnimate({});

  const handleInputStringChange = (value: string) => {
    setInputString(value);
  };

  const handleAddToDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/add-to-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputString, tableNameString }),
      });
      const data = await response.json();

      setResponseObject({
        serverResponse: data,
      });
    } catch (error: any) {
      setResponseObject({ clientError: error });
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      JSON.stringify(inputString);
      setIsInputJSONStringValid(true);
    } catch (error: any) {
      setIsInputJSONStringValid(false);
    }
  }, [inputString]);

  const handleTableNameStringChange = (value: string) => {
    setTableNameString(value);
  };

  return (
    <div ref={parent} className="space-y-4">
      <TextInput
        value={inputString}
        onChange={handleInputStringChange}
        placeholder="Enter some text"
      />
      {!isInputStringValid && (
        <p className="text-red-500">Not a valid string!</p>
      )}
      <TextInput
        value={tableNameString}
        onChange={handleTableNameStringChange}
        placeholder="Table name"
      />
      <Button disabled={loading} onClick={handleAddToDatabase}>
        Add to database
      </Button>
      {responseJSON && <JSONPretty id="cheerio-response" data={responseJSON} />}
    </div>
  );
};
