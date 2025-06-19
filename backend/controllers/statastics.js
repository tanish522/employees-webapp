const express = require('express');
const db = require('../db');
const { getHighestSalariesByDepartment, getSalaryRangeCounts, getYoungestEmployeesPerDepartment } = require('../models/statistics');


const getStatistics = async (req, res) => {
    const statistics = {};

    const highestSalaryResults = await getHighestSalariesByDepartment();
    statistics.highestSalary = highestSalaryResults;

    const rawData = await getSalaryRangeCounts();

    const transformedSalaryRanges = Object.keys(rawData).map(key => {
        return {
            salary_range: key,
            employee_count: rawData[key]
        };
    });
    statistics.salaryRanges = transformedSalaryRanges;

    const youngestEmployees = await getYoungestEmployeesPerDepartment();
    statistics.youngestEmployees = youngestEmployees;

    res.json(statistics);
}

module.exports = { getStatistics };