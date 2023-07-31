import Phaser from 'phaser';
import { AnimationKeys } from '../constants/animkeys';
import { TextureKeys } from '../constants/texturekeys';

function createPlayerAnims(anims: Phaser.Animations.AnimationManager) {
  const animsFrameRate = 15;

  // Nancy
  anims.create({
    key: AnimationKeys.NancyIdleRight,
    frames: anims.generateFrameNumbers(TextureKeys.Nancy, { start: 0, end: 5 }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.NancyIdleUp,
    frames: anims.generateFrameNumbers(TextureKeys.Nancy, { start: 6, end: 11 }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.NancyIdleLeft,
    frames: anims.generateFrameNumbers(TextureKeys.Nancy, { start: 12, end: 17 }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.NancyIdleDown,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.NancyRunRight,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancyRunUp,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancyRunLeft,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancyRunDown,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancySitDown,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancySitLeft,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancySitRight,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.NancySitUp,
    frames: anims.generateFrameNames(TextureKeys.Nancy, {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });

  // Lucy
  anims.create({
    key: AnimationKeys.LucyIdleRight,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 0,
      end: 5,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.LucyIdleUp,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 6,
      end: 11,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.LucyIdleLeft,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 12,
      end: 17,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.LucyIdleDown,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.LucyRunRight,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucyRunUp,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucyRunLeft,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucyRunDown,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucySitDown,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucySitLeft,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucySitRight,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.LucySitUp,
    frames: anims.generateFrameNames(TextureKeys.Lucy, {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });

  // Ash
  anims.create({
    key: AnimationKeys.AshIdleRight,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 0,
      end: 5,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AshIdleUp,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 6,
      end: 11,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AshIdleLeft,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 12,
      end: 17,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AshIdleDown,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AshRunRight,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshRunUp,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshRunLeft,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshRunDown,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshSitDown,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshSitLeft,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshSitRight,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AshSitUp,
    frames: anims.generateFrameNames(TextureKeys.Ash, {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });

  // Adam
  anims.create({
    key: AnimationKeys.AdamIdleRight,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 0,
      end: 5,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AdamIdleUp,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 6,
      end: 11,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AdamIdleLeft,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 12,
      end: 17,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AdamIdleDown,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  });
  anims.create({
    key: AnimationKeys.AdamRunRight,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamRunUp,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamRunLeft,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamRunDown,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamSitDown,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamSitLeft,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamSitRight,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
  anims.create({
    key: AnimationKeys.AdamSitUp,
    frames: anims.generateFrameNames(TextureKeys.Adam, {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  });
}

export { createPlayerAnims };
