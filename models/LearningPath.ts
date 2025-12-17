import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Lesson interface - represents a single lesson within a module
 */
export interface ILesson {
  title: string;
  summary: string;
}

/**
 * Module interface - represents a module containing multiple lessons
 */
export interface IModule {
  title: string;
  lessons: ILesson[];
}

/**
 * LearningPath Document interface
 */
export interface ILearningPath extends Document {
  topic: string;
  modules: IModule[];
  createdAt: Date;
}

/**
 * Lesson Schema
 */
const LessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Lesson summary is required'],
      trim: true,
    },
  },
  { _id: false }
);

/**
 * Module Schema
 */
const ModuleSchema = new Schema<IModule>(
  {
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    lessons: {
      type: [LessonSchema],
      required: true,
      validate: {
        validator: (lessons: ILesson[]) => {
          return lessons.length >= 3 && lessons.length <= 5;
        },
        message: 'Each module must have between 3 and 5 lessons',
      },
    },
  },
  { _id: false }
);

/**
 * LearningPath Schema
 */
const LearningPathSchema = new Schema<ILearningPath>(
  {
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      minlength: [1, 'Topic cannot be empty'],
    },
    modules: {
      type: [ModuleSchema],
      required: true,
      validate: {
        validator: (modules: IModule[]) => {
          return modules.length >= 4 && modules.length <= 7;
        },
        message: 'Learning path must have between 4 and 7 modules',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * LearningPath Model
 * Use existing model if already compiled (for hot reloading in development)
 */
const LearningPath: Model<ILearningPath> =
  mongoose.models.LearningPath ||
  mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);

export default LearningPath;
