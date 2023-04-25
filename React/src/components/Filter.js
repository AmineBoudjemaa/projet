import React from 'react'

export default function Filter(props) {
    function onFilterCategoryChange(event) {
      props.filterValueSelectedCategory(event.target.value);
    }
    function onFilterTypeChange(event) {
      props.filterValueSelectedType(event.target.value);
    }
  return (
    <>
      <select name="category" id="category" onChange={onFilterCategoryChange}>
        <option value="category">Category</option>
        <option value="school">School</option>
        <option value="university">University</option>
        <option value="language">Language</option>
      </select>
      <select name="type" id="type" onChange={onFilterTypeChange}>
        <option value="type">type</option>
        <option value="online">Online</option>
        <option value="attendance">Attendance</option>
      </select>
      <span>
        <input type="checkbox" id="free-courses" name="free-courses" />
        <label htmlFor="free-courses">Free courses</label>
      </span>
    </>
  );
}
