const db = require('../config/db');

class TDEELog {
    static async create({ userId, date, weight, caloriesIntake, tdee, calorieDeficitSurplus }) {
        const result = await db.query(
            `INSERT INTO tdee_logs (user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id, user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus, created_at`,
            [userId, date, weight, caloriesIntake, tdee, calorieDeficitSurplus]
        );
        return result.rows[0];
    }

    // Add more static methods for reading, updating, and deleting logs as needed
}

module.exports = TDEELog;
