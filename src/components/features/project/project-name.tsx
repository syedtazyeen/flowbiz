import { debounce } from "lodash";
import { FolderIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Render the project name and allow editing
 */
export default function ProjectName() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("Unnamed Project");
  const [savedValue, setSavedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced save
  const debouncedSave = useRef(
    debounce((val: string) => {
      setSavedValue(val || "Unnamed Project");
    }, 500)
  ).current;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (value !== savedValue) {
      debouncedSave(value);
    }
  }, [value]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => debouncedSave.cancel();
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setEditing(false);
        if (!value) setValue("Unnamed Project");
      }
    },
    [value]
  );

  useEffect(() => {
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, handleClickOutside]);

  return (
    <div className="flex items-center gap-2">
      <FolderIcon className="size-3.5" />
      {editing ? (
        <input
          ref={inputRef}
          className="text-sm font-medium border-b bg-transparent outline-none"
          value={value}
          placeholder="Project Name"
          onChange={(e) => setValue(e.target.value)}
          onClick={(e) => e.stopPropagation()} // prevent bubbling
        />
      ) : (
        <span
          className="text-sm font-medium cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {savedValue}
        </span>
      )}
    </div>
  );
}
