const db = require('../config/db');

class User {
    static async create({
        username,
        password,
        email,
        age,
        gender,
        height,
        startingWeight,
        goalWeight,
        goalWeightLossPerWeek,
        startDate,
        activityLevel,
    }) {
        const result = await db.query(
            `INSERT INTO users (username, password, email, age, gender, height, starting_weight, goal_weight, goal_weight_loss_per_week, start_date, activity_level, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING id, username, email, created_at`,
            [
                username,
                password,
                email,
                age,
                gender,
                height,
                startingWeight,
                goalWeight,
                goalWeightLossPerWeek,
                startDate,
                activityLevel,
            ]
        );
        return result.rows[0];
    }

    // Add more static methods for reading, updating, and deleting users
}

module.exports = User;
