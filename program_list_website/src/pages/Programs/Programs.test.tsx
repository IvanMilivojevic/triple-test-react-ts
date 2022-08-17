import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Programs from "./Programs";

describe("Test suite for Programs", () => {
  test("Existance of search by name text input filter", () => {
    render(<Programs />);
    const inputElement = screen.getByRole("textbox", { name: "Search by Name" });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  test("Existance of select by status filter", () => {
    render(<Programs />);
    const selectElement = screen.getByRole("button");

    expect(selectElement).toBeInTheDocument();
  });

  test("Diplays all Programs records", async () => {
    render(<Programs />);
    const allRecords = await screen.findAllByRole("row");

    expect(allRecords).toHaveLength(7);
  });

  test("Displays Active status records", async () => {
    const user = userEvent.setup();
    render(<Programs />);

    await user.click(screen.getByRole("button"));
    const listbox = within(screen.getByRole("listbox"));
    await user.click(listbox.getByText(/ACTIVE/i));
    // This waitFor should be improved, because sometimes tests fail
    // Should be checked if possible, that after filter change the request is made and finished
    const activeRecords = await waitFor(() => screen.findAllByRole("row"), { timeout: 3000 });

    expect(activeRecords).toHaveLength(5);
  });
});
