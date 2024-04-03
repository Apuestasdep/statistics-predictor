const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categoryService');
const TeamService = require('../services/teamService');
const GoalsTeamsService = require('../services/goalsTeamsService');
const PercentageMatchSerializer = require('../serializers/percentageMatchSerializer');

router.post('/create_category', async (req, res, next) => {
  const service = new CategoryService();
  const { name } = req.body;

  try {
    const category = await service.create(name.toLowerCase());

    if (service.valid) {
      res.status(201).json({
        message: `Categoría ${category.name} creada!`,
        category,
      });
    } else {
      res.status(409).json({
        message: service.errors.message,
        category,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/create_team', async (req, res, next) => {
  const service = new TeamService();
  const { name, category_id } = req.body;

  try {
    const team = await service.create(
      name.toLowerCase(),
      parseInt(category_id),
    );

    if (service.valid) {
      res.status(201).json({
        message: `Equipo ${team.name} creado!`,
        team,
      });
    } else {
      res.status(409).json({
        message: service.errors.message,
        team,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/save_match', async (req, res, next) => {});

router.get('/get_goals_teams', async (req, res, next) => {
  const service = new GoalsTeamsService(req.query);

  try {
    await service.getGoalsTeams();

    if (service.valid) {
      console.log("antes de", service.info);
      console.log("aca mirando todo", PercentageMatchSerializer.serialize(service.info));
      res.status(200).json(PercentageMatchSerializer.serialize(service.info));
    } else {
      res.status(409).json({
        message: service.errors.message,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
