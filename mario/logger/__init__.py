import logging

from mario.logger.formatter import JsonFormatter
from mario.orchestrator.data_storage import get_logs_filename
from mario.pipeline.context import task_context, run_context, pipeline_context


def get_logger() -> logging.Logger:
    """Get a logger for a task or pipeline. This function uses contexts
    so it must be called within a task function or within the internal
    functions that run a pipeline.

    Returns:
        Logger: a logger instance
    """

    pipeline = pipeline_context.get()
    task = task_context.get(None)
    pipeline_run = run_context.get(None)

    filename = get_logs_filename(pipeline_run.id)

    json_handler = logging.FileHandler(filename)
    json_formatter = JsonFormatter(pipeline=pipeline.id, task=task.id if task else None)
    json_handler.setFormatter(json_formatter)

    logger_name = f"mario.{task.id}" if task else f"mario.{pipeline.id}"

    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(json_handler)

    return logger
