## Вопрос 1. Дженерики: определение, отличие от any, пример с ограничением.

Generics - это механизм TypeScript, который дает возможность создавать компоненты, которые могут работать с различными типами данных, а не только с одним. Это позволяет пользователям использовать эти компоненты и применять собственные типы данных.
	
Использование `any` является универсальным, поскольку оно заставляет функцию принимать любые типы для заданного типа `arg`, на самом деле мы теряем информацию о том, какой это был тип, когда функция возвращает значение. Если бы мы передали число, единственная информация, которой мы располагаем, заключалась бы в том, что может быть возвращен любой тип.

```js

// Определяем интерфейс с требуемым свойством
interface HasLength {
    length: number;
}
// Ограничиваем T: он должен иметь свойство length
function getLength<T extends HasLength>(item: T): number {
    return item.length;
}
// ✅ Работает: у строки есть length
console.log(getLength("TypeScript")); // 10
// ✅ Работает: у массива есть length
console.log(getLength([1, 2, 3, 4, 5])); // 5
// ❌ Ошибка: у числа 42 нет свойства length
console.log(getLength(42)); 
// Ошибка компиляции: Аргумент типа 'number' не назначается параметру типа 'HasLength
```

## Вопрос 2. type vs interface: различия, критерии выбора, extends.

**Interface** — это способ описания структуры объекта в TypeScript. Он предназначен для определения контрактов, которым должны соответствовать объекты. Интерфейсы поддерживают **расширение** (`extends`) и **объединение** (declaration merging).


```js
	interface User {
	    name: string;
	    age: number;
	}
	interface Admin extends User {
	    role: string;
	}
```

**Type** (псевдоним типа) — это способ дать имя любому типу данных: примитиву, объединению, пересечению, кортежу, функции и т.д. Type более гибок, но не поддерживает declaration merging.

```typescript
	type User = {
	    name: string;
	    age: number;
	};
	type ID = string | number; // Объединение
	type Coordinates = [number, number]; // Кортеж
	type Callback = (data: string) => void; // Функция
```

 1. Что могут описывать

- **`interface`** — только объекты и функции (структуры)
- **`type`** — всё: объекты, примитивы, объединения, кортежи, функции, условные типы

 2. Объединения (Union) и кортежи

- **`interface`** — ❌ не поддерживает
- **`type`** — ✅ поддерживает (`type ID = string | number`)

3. Расширение

- **`interface`** — через `extends`
- **`type`** — через пересечение `&`

 4. Declaration Merging (слияние объявлений)
 
- **`interface`** — ✅ поддерживает (можно объявить несколько раз)
- **`type`** — ❌ не поддерживает (ошибка при повторном объявлении)

5. Примитивы

- **`interface`** — ❌ не может (`interface Name = string` — ошибка)
- **`type`** — ✅ может (`type Name = string`)

 6. Вычисляемые и условные типы

- **`interface`** — ❌ не поддерживает
- **`type`** — ✅ поддерживает (`type Keys = keyof T`)

 7. Скорость компиляции
- **`interface`** — быстрее (проще для проверки)
- **`type`** — медленнее (может содержать сложную логику)

 8. Работа с классами (`implements`)
 
- **`interface`** — ✅ отлично работает
- **`type`** — ✅ тоже работает, но реже используется
### Критерии выбора

```ts
// Используйте interface, если:
interface User {
    name: string; // Описываете объект
}

// Используйте type, если:
type Status = "active" | "inactive"; // Нужен union
type ID = string | number;           // Нужен примитив
type Point = [number, number];       // Нужен кортеж
type Keys = keyof User;              // Нужен вычисляемый тип
```

## Вопрос 3. Intersection и Union: разница, работа со свойствами, type guard.

- **Union (`|`)** — тип, который может быть **одним из** нескольких вариантов ("ИЛИ")
    
- **Intersection (`&`)** — тип, который объединяет **все свойства** нескольких типов ("И")
    
```typescript
type Status = "pending" | "success"; // Union — или то, или другое
type User = { name: string } & { age: number }; // Intersection — и то, и другое
```

|                     | **Union (``)**                           | **Intersection (`&`)**           |
| :------------------ | :--------------------------------------- | :------------------------------- |
|  **Логика**         | "ИЛИ" (один вариант)                     | "И" (все вместе)                 |
|  **Свойства**       | Доступны только общие для всех вариантов | Доступны все свойства всех типов |
|  **Использование**  | Альтернативные варианты                  | Комбинирование сущностей         |
**Union** — доступны только общие свойства:

```typescript
type Dog = { name: string; bark: () => void };
type Cat = { name: string; meow: () => void };
type Pet = Dog | Cat;
function handle(pet: Pet) {
    console.log(pet.name); // ✅ OK (общее свойство)
    // pet.bark(); // ❌ Ошибка: может быть Cat
}
```

**Intersection** — доступны все свойства:

```typescript
type DogCat = Dog & Cat;
const pet: DogCat = {
    name: "Рыжик",
    bark: () => console.log("Гав!"),
    meow: () => console.log("Мяу!")
};
pet.bark(); // ✅ OK
pet.meow(); // ✅ OK
```

**Type Guard** (сужающая проверка) — это механизм TypeScript, который помогает компилятору **определить конкретный тип** переменной внутри условных блоков кода. Это позволяет безопасно обращаться к свойствам, характерным для конкретного типа.

| Способ               | Что проверяет                                 | Когда использовать                       |
| -------------------- | --------------------------------------------- | ---------------------------------------- |
| **`typeof`**         | Тип примитива (`string`, `number`, `boolean`) | Для примитивных типов                    |
| **`in`**             | Наличие свойства в объекте                    | Для объектов с разными свойствами        |
| **`instanceof`**     | Класс, от которого создан объект              | Для экземпляров классов                  |
| **Предикаты** (`is`) | Своя пользовательская проверка                | Для сложной логики определения типа      |
| **Дискриминатор**    | Общее поле-маркер (`kind`, `type`, `status`)  | Для объектов с фиксированными вариантами |
## Вопрос 4. Объяснить работу типа:  
```ts
type KeysOfType<T, U> = {  
[K in keyof T]: T[K] extends U ? K : never;  
}[keyof T];
```
Этот тип — **пример продвинутого маппинга (mapped types) и условных типов** в TypeScript. Он находит все ключи объекта `T`, значения которых имеют тип `U`.

```ts
type User = {
    id: number;
    name: string;
    age: number;
    email: string;
    isActive: boolean;
};
// Находим все ключи, значения которых имеют тип string
type StringKeys = KeysOfType<User, string>;
// Результат: "name" | "email" 
```

## Вопрос 5. Утилитарные типы: Partial, Pick, Omit, Record, Readonly. Назначение, примеры.

## `Partial<Type>`

Создает тип, у которого все свойства `Type`установлены в необязательные. Эта утилита вернет тип, представляющий все подмножества заданного типа.

```ts
interface Todo {
title: string;
description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
title: "organize desk",
description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
description: "throw out trash",
});

// Результат:
{
    title: "organize desk",     // взято из todo1
    description: "throw out trash" // перезаписано из fieldsToUpdate
}
```

## `Pick<Type, Keys>`

Создает тип, выбирая набор свойств `Keys`(строковый литерал или объединение строковых литералов) из `Type`.

```ts
interface Todo {
title: string;
description: string;
completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
title: "Clean room",
completed: false,
};

todo; // Имеет тип TodoPreview который содержит только два поля из interface Todo
```

## `Omit<Type, Keys>`

Создает тип, выбирая все свойства из `Type`и затем исключая `Keys`(строковый литерал или объединение строковых литералов). Противоположность `Pick`

```ts
interface Todo {
title: string;
description: string;
completed: boolean;
createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
title: "Clean room",
completed: false,
createdAt: 1615544252770,
};

todo; //имеет тип TodoPreview, который содержит все поля интерфейса Todo,
// за исключением поля "description", которое мы исключили с помощью Omit
```

## `Record<Keys, Type>`

Создает объект типа, ключами свойств которого являются `Keys`, а значениями свойств — `Type`. Эта утилита может использоваться для сопоставления свойств одного типа со свойствами другого типа.

```ts
type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
age: number;
breed: string;
}

const cats: Record<CatName, CatInfo> = {
miffy: { age: 10, breed: "Persian" },
boris: { age: 5, breed: "Maine Coon" },
mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;

const cats: Record<CatName, CatInfo> // Record<CatName, CatInfo> — это тип-словарь, где ключи строго ограничены тремя именами котов,
// а значения должны быть объектами с полями age (number) и breed (string)
```

## `Readonly<Type>`


Создает тип, у которого все свойства `Type`установлены в `readonly`значение , что означает, что свойства созданного типа не могут быть переназначены.
```ts
interface Todo {
title: string;
}

const todo: Readonly<Todo> = {
title: "Delete inactive users",
};

todo.title = "Hello"; //❌
// Readonly<Todo> делает все поля Todo доступными только для чтения.
// Изменение todo.title запрещено на уровне TypeScript.
```
