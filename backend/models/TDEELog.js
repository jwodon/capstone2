const db = require('../config/db');

class TDEELog {
    static async create({ userId, date, weight, caloriesIntake, tdee, calorieDeficitSurplus }) {
        const result = await db.query(
            `INSERT INTO tdee_logs (user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus`,
            [userId, date, weight, caloriesIntake, tdee, calorieDeficitSurplus]
        );
        return result.rows[0];
    }

    static async update({ id, weight, caloriesIntake, tdee, calorieDeficitSurplus }) {
        const result = await db.query(
            `UPDATE tdee_logs
             SET weight = $2, calories_intake = $3, tdee = $4, calorie_deficit_surplus = $5
             WHERE id = $1
             RETURNING id, user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus`,
            [id, weight, caloriesIntake, tdee, calorieDeficitSurplus]
        );
        return result.rows[0];
    }

    static async findByUserIdAndDate(userId, date) {
        const result = await db.query(
            `SELECT id, user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus
             FROM tdee_logs
             WHERE user_id = $1 AND date = $2`,
            [userId, date]
        );
        return result.rows[0];
    }

    static async findByUserIdAndStartDate(userId, startDate) {
        const result = await db.query(
            `SELECT id, user_id, date, weight, calories_intake, tdee, calorie_deficit_surplus
             FROM tdee_logs
             WHERE user_id = $1 AND date >= $2
             ORDER BY date ASC`,
            [userId, startDate]
        );
        return result.rows;
    }
}

module.exports = TDEELog;
